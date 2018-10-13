import { GA } from "@/init/ga";
import { EventBus, EventNames } from "./../../services/eventBus/index";
import { globalMutations, $store } from "./../../store/index";
import { routes } from "./../../router/routeNames";
import { Vue, Component, Watch } from "vue-property-decorator";
import { youtubeService } from "@/services/youtube";

@Component
export default class Header extends Vue {
  query: string = "";
  searching: boolean = false;
  searchSuggestions: string[] = [];
  searchSelectedValue = "";
  preventNextSearch = false;

  $refs!: {
    searchBox: Vue;
  };

  get searchInput() {
    return this.$refs.searchBox.$el!.querySelector("input")!;
  }

  created() {
    EventBus.$on(
      EventNames.clearSearchText,
      () => (this.searchSelectedValue = "")
    );
  }

  mounted() {
    this.searchInput.addEventListener("keydown", e => {
      (e.keyCode === 38 || e.keyCode === 40) && e.preventDefault();
    });
  }

  @Watch("query")
  onSearch() {
    if (this.preventNextSearch) {
      this.preventNextSearch = false;
      this.searchSuggestions = [];
      return;
    }
    if (this.query) {
      this.searching = true;
      let sentQuery = this.query;
      youtubeService
        .getSuggestions(this.query)
        .then(suggestions => {
          if (this.preventNextSearch) {
            this.preventNextSearch = false;
            this.searchSuggestions = [];
            return;
          }
          if (this.query === sentQuery) {
            this.searchSuggestions = suggestions;
          }
        })
        .finally(() => {
          this.searching = false;
        });
    } else {
      this.searching = false;
      this.searchSuggestions = [];
    }
  }

  searchVideos() {
    if (this.searchSelectedValue) {
      GA.sendGeneralEvent(
        "engagement",
        "header-video-search",
        this.searchSelectedValue
      );
      this.$router.push({
        name: routes.search.name,
        params: {
          query: this.searchSelectedValue.replace(/\s/g, "+")
        }
      });
      this.preventNextSearch = true;
      this.searchSuggestions = [];
      //Following line to close keyboard on mobile
      this.searchInput.blur();
    }
  }

  toggleDrawer() {
    $store.commit(globalMutations.toggleDrawer);
  }

  sendLogoClickGA() {
    GA.sendGeneralEvent("engagement", "header-logo-click");
  }
}
