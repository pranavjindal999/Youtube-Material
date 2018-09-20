import InfiniteVideoList from "@/app/shared/InfiniteVideoList/InfiniteVideoList.vue";
import { Vue, Component, Prop } from "vue-property-decorator";
import { VideoFetcher } from "@/app/shared/InfiniteVideoList/InfiniteVideoList";
import { youtubeService } from "@/services/youtube";

@Component({
  components: {
    InfiniteVideoList
  }
})
export default class ChannelVideos extends Vue {
  @Prop({ type: String, required: true })
  id!: string;

  getChannelVideos!: VideoFetcher;

  created() {
    this.setVideoFetcher();
  }

  setVideoFetcher() {
    this.getChannelVideos = (nextPageToken?: string) => {
      return youtubeService
        .searchVideos({
          order: "date",
          channelId: this.id,
          pageToken: nextPageToken
        })
        .then(result => {
          let ids = result.items.map(v => v.id.videoId);
          let nextPageToken = result.nextPageToken;

          return youtubeService.getVideoDetails(ids).then(result => {
            return {
              nextPageToken: nextPageToken,
              videos: result.items
            };
          });
        });
    };
  }
}
