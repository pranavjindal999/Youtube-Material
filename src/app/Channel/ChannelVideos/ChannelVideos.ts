import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { youtubeService } from "@/services/youtube";
import InfiniteVideoList from "@/app/shared/InfiniteList/InfiniteVideoList/InfiniteVideoList.vue";

@Component({
  components: {
    InfiniteVideoList
  }
})
export default class ChannelVideos extends Vue {
  @Prop({ type: String, required: true })
  id!: string;

  get channelVideosFetcher(): ListFetcher<GoogleApiYouTubeVideoResource> {
    return (maxResults, pageToken) => {
      return youtubeService
        .searchVideos({
          order: "date",
          channelId: this.id,
          pageToken,
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
