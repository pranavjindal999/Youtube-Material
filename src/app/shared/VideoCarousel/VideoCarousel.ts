import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import VideoTile from "@/app/shared/VideoTile/VideoTile";

@Component({
  components: { VideoTile }
})
export default class VideoCarousel extends Vue {
  @Prop({ type: Boolean, default: false })
  hideChannelLink!: boolean;

  @Prop({ type: Function, required: true })
  videoFetcher!: VideoListFetcher;

  nextPageToken?: string = "";
  prevPageToken?: string = "";
  videos: GoogleApiYouTubeVideoResource[] = [];
  currentRequest: Promise<any> | null = null;

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
    this.next();
  }

  previous() {
    this.getVideos(this.prevPageToken);
  }

  next() {
    this.getVideos(this.nextPageToken);
  }

  async getVideos(pageToken?: string) {
    await Promise.resolve(this.currentRequest);

    this.videos = new Array(this.maxResults);

    this.currentRequest = this.videoFetcher(this.maxResults, pageToken).then(
      response => {
        this.prevPageToken = response.prevPageToken;
        this.nextPageToken = response.nextPageToken;
        this.videos = response.items;
      }
    );
  }
}
