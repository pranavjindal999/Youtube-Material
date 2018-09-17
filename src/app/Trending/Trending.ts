import { trendingCategories } from "./../Navigation/TrendingCategories";
import VideoTile from "@/app/shared/VideoTile/VideoTile.vue";
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { keyBy } from "lodash";
import { youtubeService } from "@/services/youtube";
import ScrollFire from "@/app/shared/ScrollFire/ScrollFire.vue";

@Component({
  components: {
    VideoTile,
    ScrollFire
  }
})
export default class Trending extends Vue {
  @Prop({ type: String, default: "" })
  category!: string;

  nextPageToken?: string = "";
  haveMore = true;
  videos: GoogleApiYouTubeVideoResource[] = [];

  currentRequest?: Promise<any>;

  get categoryId() {
    if (this.category)
      return keyBy(trendingCategories, "name")[this.category].id;
    else return "";
  }

  @Watch("categoryId")
  async getVideos(newCategoryId?: string, oldCategoryId?: string) {
    await Promise.resolve(this.currentRequest);
    if (newCategoryId !== oldCategoryId) {
      this.videos = [];
      this.haveMore = true;
      this.nextPageToken = "";
    }
    if (!this.haveMore) {
      return;
    }
    this.videos.splice(this.videos.length, 0, ...new Array(18));
    this.currentRequest = youtubeService
      .getPopularVideos({
        videoCategoryId: this.categoryId,
        pageToken: this.nextPageToken
      })
      .then(result => {
        if (!result.nextPageToken) {
          this.haveMore = false;
        }
        this.nextPageToken = result.nextPageToken;
        this.videos.splice(this.videos.length - 18, 18, ...result.items);
      });
  }
}
