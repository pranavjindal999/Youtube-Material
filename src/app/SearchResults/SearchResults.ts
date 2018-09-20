import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { youtubeService } from "@/services/youtube";
import InfiniteVideoList from "@/app/shared/InfiniteVideoList/InfiniteVideoList.vue";
import { DeferredObservable } from "@/extras/DeferredObservable";

@Component({
  components: { InfiniteVideoList }
})
export default class SearchResults extends Vue {
  @Prop({
    type: String,
    required: true
  })
  query!: string;

  getSearchResults!: VideoListFetcher;

  resetDeferredObservable = new DeferredObservable();

  created() {
    this.setVideoFetcher();
  }

  setVideoFetcher() {
    this.getSearchResults = (maxResults, pageToken) => {
      return youtubeService
        .searchVideos({
          query: this.query,
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

  @Watch("query")
  async search() {
    this.resetDeferredObservable.next();
  }
}
