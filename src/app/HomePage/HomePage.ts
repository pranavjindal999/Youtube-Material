import VideoCarousel from "@/app/shared/VideoCarousel/VideoCarousel.vue";
import { Vue, Component, Prop } from "vue-property-decorator";
import { trendingCategories } from "@/app/Navigation/TrendingCategories";
import { youtubeService } from "@/services/youtube";

@Component({
  components: {
    VideoCarousel
  }
})
export default class HomePage extends Vue {
  categories = trendingCategories;

  isNotLast(index: number) {
    return index !== this.categories.length - 1;
  }

  getPopularVideos(category: typeof trendingCategories[0]): VideoListFetcher {
    return (maxResults, pageToken) => {
      return youtubeService.getCategoryTrendingVideos({
        pageToken,
        maxResults,
        videoCategoryId: category.id
      });
    };
  }
}
