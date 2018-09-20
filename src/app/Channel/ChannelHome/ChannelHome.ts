import { Vue, Component, Prop } from "vue-property-decorator";
import { youtubeService } from "@/services/youtube";
import VideoCarousel from "@/app/shared/VideoCarousel/VideoCarousel.vue";

@Component({
  components: {
    VideoCarousel
  }
})
export default class ChannelHome extends Vue {
  @Prop({ type: String, required: true })
  id!: string;

  getPopularVideos = this.getVideoListFetcher("viewCount");
  getRecentVideos = this.getVideoListFetcher("date");

  getVideoListFetcher(order: "date" | "viewCount"): VideoListFetcher {
    return (maxResults, pageToken) => {
      return youtubeService
        .searchVideos({
          channelId: this.id,
          pageToken,
          order: order,
          maxResults
        })
        .then(result => {
          let ids = result.items.map(v => v.id.videoId);
          return youtubeService.getVideoDetails(ids).then(videoResult => {
            videoResult.nextPageToken = result.nextPageToken;
            videoResult.prevPageToken = result.prevPageToken;
            return videoResult;
          });
        });
    };
  }
}
