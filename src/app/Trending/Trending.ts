import Helmet from "@/app/shared/Helmet/Helmet.vue";
import IconHeading from "@/app/shared/IconHeading/IconHeading.vue";
import { DeferredObservable } from "./../../extras/DeferredObservable";
import { trendingCategories } from "./../Navigation/TrendingCategories";
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { keyBy } from "lodash";
import { youtubeService } from "@/services/youtube";
import { LangKeys } from "@/translations";
import InfiniteVideoList from "@/app/shared/InfiniteList/InfiniteVideoList/InfiniteVideoList.vue";

@Component({
  components: {
    InfiniteVideoList,
    IconHeading,
    Helmet
  },
  name: "Trending"
})
export default class Trending extends Vue {
  @Prop({ type: String, default: "" })
  category!: string;

  resetDeferredObservable = new DeferredObservable();

  get metaTitle() {
    return `${this.$t(LangKeys.trending)} ${
      this.categoryObj ? `(${this.$t(this.categoryObj.labelKey)})` : ""
    }`;
  }

  get metaDescription() {
    if (this.categoryObj) {
      return `Latest trending videos in ${this.$t(
        this.categoryObj.labelKey
      )}...`;
    } else {
      return "Latest trending videos ...";
    }
  }

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

  get trendingVideoFetcher(): ListFetcher<GoogleApiYouTubeVideoResource> {
    return (maxResults, pageToken) => {
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
