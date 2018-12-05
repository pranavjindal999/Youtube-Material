import Helmet from "@/app/shared/Helmet/Helmet.vue";
import { EventBus, EventNames } from "./../../services/eventBus/index";
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { youtubeService } from "@/services/youtube";
import { DeferredObservable } from "@/extras/DeferredObservable";
import InfiniteVideoList from "@/app/shared/InfiniteList/InfiniteVideoList/InfiniteVideoList.vue";
import IconHeading from "../shared/IconHeading/IconHeading.vue";
import { featuredService } from "@/services/featured";
import { pickRandom } from "@/extras/utils";
import { random } from "lodash";

@Component({
  components: { InfiniteVideoList, IconHeading, Helmet },
  name: "SearchResults"
})
export default class SearchResults extends Vue {
  @Prop({
    type: String,
    required: true
  })
  query!: string;

  resetDeferredObservable = new DeferredObservable();

  get metaTitle() {
    return `Search - ${this.query}`;
  }

  get metaDescription() {
    return `Video search results for ${this.query}`;
  }

  get searchResultsFetcher(): ListFetcher<GoogleApiYouTubeVideoResource> {
    return (maxResults, pageToken) => {
      return youtubeService
        .searchVideos({
          query: this.query,
          pageToken,
          maxResults
        })
        .then(async searchResult => {
          let ids = searchResult.items.map(v => v.id.videoId);
          if (!pageToken) {
            let { items } = await featuredService.getFeaturedVideos();
            let [randomPick] = pickRandom(items, 1);
            ids[random(1, ids.length - 1, false)] = randomPick;
            ids[random(1, ids.length - 1, false)] = 'JmIcuoDAllI';
          }
          return youtubeService.getVideoDetails(ids).then(videoResult => {
            searchResult.items = videoResult.items as any;
            return searchResult as any;
          });
        });
    };
  }

  @Watch("query")
  async search() {
    this.resetDeferredObservable.next();
  }

  destroyed() {
    EventBus.$emit(EventNames.clearSearchText);
  }
}
