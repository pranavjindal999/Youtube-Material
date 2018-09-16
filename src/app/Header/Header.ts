import { Vue, Component, Watch } from "vue-property-decorator";
import { youtubeService } from "@/services/youtube";

@Component
export default class Header extends Vue {
  query: string = "";
  searching: boolean = false;
  searchSuggestions: string[] = [];
  searchSelectedValue = "";

  @Watch("query")
  onSearch() {
    if (this.query) {
      this.searching = true;
      youtubeService.getSuggestions(this.query).then(suggestions => {
        this.searching = false;
        this.searchSuggestions = suggestions;
      });
    } else {
      this.searching = false;
      this.searchSuggestions = [];
    }
  }

  searchVideos() {
    this.$nextTick(() => {
      if (this.searchSelectedValue)
        alert("submit  " + this.searchSelectedValue);
    });
  }
}
