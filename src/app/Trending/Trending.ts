import { DeferredObservable } from "./../../extras/DeferredObservable";
import InfiniteVideoList from "./../shared/InfiniteVideoList/InfiniteVideoList.vue";
import { trendingCategories } from "./../Navigation/TrendingCategories";
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { keyBy } from "lodash";
import { youtubeService } from "@/services/youtube";
import { LangKeys } from "@/translations";

@Component({
  components: {
    InfiniteVideoList
  }
})
export default class Trending extends Vue {
  @Prop({ type: String, default: "" })
  category!: string;

  getTrendingVideos!: VideoListFetcher;

  resetDeferredObservable = new DeferredObservable();

  get categoryObj() {
    if (this.category) {
      return keyBy(trendingCategories, "name")[this.category];
    }
  }

  get categoryId() {
    return this.categoryObj ? this.categoryObj.id : "";
  }

  get categoryIcon() {
    return this.categoryObj ? this.categoryObj.icon : "trending_up";
  }

  get categoryLabelKey() {
    return this.categoryObj ? this.categoryObj.labelKey : LangKeys.trending;
  }

  created() {
    this.setVideoFetcher();
  }

  setVideoFetcher() {
    this.getTrendingVideos = (maxResults, pageToken) => {
      return youtubeService.getCategoryTrendingVideos({
        videoCategoryId: this.categoryId,
        pageToken,
        maxResults
      });
    };
  }

  @Watch("categoryId")
  categoryWatch() {
    this.resetDeferredObservable.next();
  }
}
