import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import VideoTile from "@/app/shared/VideoTile/VideoTile";
import { Onable } from "@/extras/DeferredObservable";

@Component({
  components: { VideoTile }
})
export default class VideoCarousel extends Vue {
  @Prop({ type: Boolean, default: false })
  hideChannelLink!: boolean;

  @Prop({ type: Function, required: true })
  videoFetcher!: ListFetcher<GoogleApiYouTubeVideoResource>;

  @Prop({ type: Onable, required: false })
  resetOnable?: Onable;

  nextPageToken?: string = "";
  prevPageToken?: string = "";
  videos: GoogleApiYouTubeVideoResource[] = [];
  isCurrentRequestPending: boolean = false;

  get maxResults() {
    if (this.$vuetify.breakpoint.smAndDown) {
      return 2;
    } else if (this.$vuetify.breakpoint.mdAndDown) {
      return 4;
    } else {
      return 6;
    }
  }

  mounted() {
    this.resetOnable && this.resetOnable.on(this.reset);
    this.reset();
  }

  reset() {
    this.nextPageToken = "";
    this.prevPageToken = "";
    this.videos = [];
    this.isCurrentRequestPending = false;
    this.next();
  }

  previous() {
    this.getVideos(this.prevPageToken);
  }

  next() {
    this.getVideos(this.nextPageToken);
  }

  async getVideos(pageToken?: string) {
    if (this.isCurrentRequestPending) {
      return;
    }

    this.videos = new Array(this.maxResults);
    this.isCurrentRequestPending = true;

    this.videoFetcher(this.maxResults, pageToken)
      .then(response => {
        this.prevPageToken = response.prevPageToken;
        this.nextPageToken = response.nextPageToken;
        this.videos = response.items;
      })
      .finally(() => {
        this.isCurrentRequestPending = false;
      });
  }
}
