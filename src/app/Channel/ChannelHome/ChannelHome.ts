import { DeferredObservable } from "@/extras/DeferredObservable";
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { youtubeService } from "@/services/youtube";
import VideoCarousel from "@/app/shared/VideoCarousel/VideoCarousel.vue";
import IconHeading from "@/app/shared/IconHeading/IconHeading.vue";

@Component({
  components: {
    VideoCarousel,
    IconHeading
  }
})
export default class ChannelHome extends Vue {
  @Prop({ type: String, required: true })
  id!: string;

  getPopularVideos = this.getVideoListFetcher("viewCount");
  getRecentVideos = this.getVideoListFetcher("date");

  resetDeferred = new DeferredObservable();

  @Watch("id")
  reset() {
    this.resetDeferred.next();
  }

  getVideoListFetcher(
    order: "date" | "viewCount"
  ): ListFetcher<GoogleApiYouTubeVideoResource> {
    return (maxResults, pageToken) => {
      return youtubeService
        .searchVideos({
          channelId: this.id,
          pageToken,
          order: order,
          maxResults
        })
        .then(searchResult => {
          let ids = searchResult.items.map(v => v.id.videoId);
          return youtubeService.getVideoDetails(ids).then(videoResult => {
            searchResult.items = videoResult.items as any;
            return searchResult as any;
          });
        });
    };
  }
}
