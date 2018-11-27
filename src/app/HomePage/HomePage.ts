import { CustomTrendingCategory } from "./../Navigation/TrendingCategories";
import Helmet from "@/app/shared/Helmet/Helmet.vue";
import VideoCarousel from "@/app/shared/VideoCarousel/VideoCarousel.vue";
import { Vue, Component } from "vue-property-decorator";
import { trendingCategories } from "@/app/Navigation/TrendingCategories";
import { youtubeService } from "@/services/youtube";
import IconHeading from "@/app/shared/IconHeading/IconHeading.vue";
import { featuredService } from "@/services/featured";

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
    return async (maxResults, pageToken) => {
      if (category.id === CustomTrendingCategory.FEATURED) {
        let vidoeIds = await featuredService.getFeaturedVideos();
        return youtubeService.getVideoDetails(vidoeIds);
      } else {
        return youtubeService.getCategoryTrendingVideos({
          pageToken,
          maxResults,
          videoCategoryId: category.id
        });
      }
    };
  }
}
