import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { youtubeService } from "@/services/youtube";
import InfiniteVideoList from "@/app/shared/InfiniteVideoList/InfiniteVideoList.vue";
import { VideoFetcher } from "@/app/shared/InfiniteVideoList/InfiniteVideoList";
import { DeferredObservale } from "@/extras/DeferredObservale";

@Component({
  components: { InfiniteVideoList }
})
export default class SearchResults extends Vue {
  @Prop({
    type: String,
    required: true
  })
  query!: string;

  getSearchResults!: VideoFetcher;

  resetDeferredObservable = new DeferredObservale();

  created() {
    this.setVideoFetcher();
  }

  setVideoFetcher() {
    this.getSearchResults = (nextPageToken?: string) => {
      return youtubeService
        .searchVideos({
          query: this.query,
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

  @Watch("query")
  async search() {
    this.resetDeferredObservable.next();
  }
}
