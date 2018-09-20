import InfiniteVideoList from "@/app/shared/InfiniteVideoList/InfiniteVideoList.vue";
import { Vue, Component, Prop } from "vue-property-decorator";
import { youtubeService } from "@/services/youtube";

@Component({
  components: {
    InfiniteVideoList
  }
})
export default class ChannelVideos extends Vue {
  @Prop({ type: String, required: true })
  id!: string;

  getChannelVideos!: VideoListFetcher;

  created() {
    this.setVideoFetcher();
  }

  setVideoFetcher() {
    this.getChannelVideos = (maxResults, pageToken) => {
      return youtubeService
        .searchVideos({
          order: "date",
          channelId: this.id,
          pageToken,
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
