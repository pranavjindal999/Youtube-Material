import { Onable } from "./../../../extras/DeferredObservale";
import VideoTile from "@/app/shared/VideoTile/VideoTile.vue";
import { Vue, Component, Prop } from "vue-property-decorator";
import ScrollFire from "@/app/shared/ScrollFire/ScrollFire.vue";
import { $store } from "@/store";

@Component({
  components: { ScrollFire, VideoTile }
})
export default class InfiniteVideoList extends Vue {
  @Prop({ type: Boolean, default: false })
  hideChannelLink!: boolean;

  @Prop({ type: Function, required: true })
  videoFetcher!: VideoFetcher;

  @Prop({ type: Onable, required: false })
  resetOnable?: Onable;

  nextPageToken?: string = "";
  haveMore = true;
  videos: GoogleApiYouTubeVideoResource[] = [];
  currentRequest: Promise<any> | null = null;

  created() {
    if (this.resetOnable) {
      this.resetOnable.on(this.initialize);
    }
  }

  initialize() {
    this.nextPageToken = "";
    this.haveMore = true;
    this.videos = [];
    this.currentRequest = null;
    this.onScrollFire();
  }

  async onScrollFire() {
    await Promise.resolve(this.currentRequest);

    if (!this.haveMore) {
      return;
    }

    this.videos.splice(
      this.videos.length,
      0,
      ...new Array($store.state.maxResults)
    );

    this.currentRequest = this.videoFetcher(this.nextPageToken).then(
      response => {
        if (!response.nextPageToken) {
          this.haveMore = false;
        }
        this.nextPageToken = response.nextPageToken;
        this.videos.splice(
          this.videos.length - $store.state.maxResults,
          $store.state.maxResults,
          ...response.videos
        );
      }
    );
  }
}

export type VideoFetcher = (
  nextPageToken?: string
) => Promise<{
  nextPageToken: string;
  videos: GoogleApiYouTubeVideoResource[];
}>;
