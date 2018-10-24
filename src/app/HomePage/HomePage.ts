import Helmet from "@/app/shared/Helmet/Helmet.vue";
import VideoCarousel from "@/app/shared/VideoCarousel/VideoCarousel.vue";
import { Vue, Component, Prop } from "vue-property-decorator";
import { trendingCategories } from "@/app/Navigation/TrendingCategories";
import { youtubeService } from "@/services/youtube";
import IconHeading from "@/app/shared/IconHeading/IconHeading.vue";

@Component({
  components: {
    VideoCarousel,
    IconHeading,
    Helmet
  },
  name: "HomePage"
})
export default class HomePage extends Vue {
  categories = trendingCategories;

  get metaDescription() {
    return "vTyoob.com is your video source on internet with a slick interface. Find latest videos in music, movies, sports, comedy and more....";
  }

  isNotLast(index: number) {
    return index !== this.categories.length - 1;
  }

  getVidoListFetcher(
    category: typeof trendingCategories[0]
  ): ListFetcher<GoogleApiYouTubeVideoResource> {
    return (maxResults, pageToken) => {
      return youtubeService.getCategoryTrendingVideos({
        pageToken,
        maxResults,
        videoCategoryId: category.id
      });
    };
  }
}
