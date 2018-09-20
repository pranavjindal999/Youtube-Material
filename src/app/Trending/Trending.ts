import { DeferredObservable } from "./../../extras/DeferredObservable";
import InfiniteVideoList from "./../shared/InfiniteVideoList/InfiniteVideoList.vue";
import { trendingCategories } from "./../Navigation/TrendingCategories";
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { keyBy } from "lodash";
import { youtubeService } from "@/services/youtube";

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

  get categoryId() {
    if (this.category)
      return keyBy(trendingCategories, "name")[this.category].id;
    else return "";
  }

  get categoryIcon() {
    if (this.category)
      return keyBy(trendingCategories, "name")[this.category].icon;
    else return "trending_up";
  }

  get categoryLabelKey() {
    if (this.category)
      return keyBy(trendingCategories, "name")[this.category].labelKey;
    else return "trending";
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
