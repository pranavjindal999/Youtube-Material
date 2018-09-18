import { DeferredObservale } from "./../../extras/DeferredObservale";
import InfiniteVideoList from "./../shared/InfiniteVideoList/InfiniteVideoList.vue";
import { trendingCategories } from "./../Navigation/TrendingCategories";
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { keyBy } from "lodash";
import { youtubeService } from "@/services/youtube";
import { VideoFetcher } from "@/app/shared/InfiniteVideoList/InfiniteVideoList";

@Component({
  components: {
    InfiniteVideoList
  }
})
export default class Trending extends Vue {
  @Prop({ type: String, default: "" })
  category!: string;

  getTrendingVideos!: VideoFetcher;

  resetDeferredObservable = new DeferredObservale();

  get categoryId() {
    if (this.category)
      return keyBy(trendingCategories, "name")[this.category].id;
    else return "";
  }

  created() {
    this.setVideoFetcher();
  }

  setVideoFetcher() {
    this.getTrendingVideos = (nextPageToken?: string) => {
      return youtubeService
        .getPopularVideos({
          videoCategoryId: this.categoryId,
          pageToken: nextPageToken
        })
        .then(result => {
          return {
            nextPageToken: result.nextPageToken,
            videos: result.items
          };
        });
    };
  }

  @Watch("categoryId")
  categoryWatch() {
    this.resetDeferredObservable.next();
  }
}
