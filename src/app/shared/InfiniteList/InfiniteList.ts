import { Onable } from "./../../../extras/DeferredObservable";
import { Vue, Component, Prop } from "vue-property-decorator";
import { $store } from "@/store";

@Component
export default class InfiniteList<T> extends Vue {
  @Prop({ type: Function, required: true })
  listFetcher!: ListFetcher<T>;

  @Prop({ type: Onable, required: false })
  resetOnable?: Onable;

  nextPageToken?: string = "";
  haveMore = true;
  list: T[] = [];
  isCurrentRequestPending: boolean = false;
  totalResults: number | null = null;
  resultsFetchedYet: number = 0;

  created() {
    if (this.resetOnable) {
      this.resetOnable.on(this.reset);
    }
  }

  reset() {
    this.nextPageToken = "";
    this.haveMore = true;
    this.list = [];
    this.totalResults = null;
    this.resultsFetchedYet = 0;
    this.isCurrentRequestPending = false;
    this.onScrollFire();
  }

  getResultsToFetch() {
    if (this.totalResults) {
      return Math.min(
        $store.state.maxResults,
        this.totalResults - this.resultsFetchedYet
      );
    } else {
      return $store.state.maxResults;
    }
  }

  async onScrollFire() {
    if (!this.haveMore || this.isCurrentRequestPending) {
      return;
    }

    let resultsToFetch = this.getResultsToFetch();

    this.list.splice(this.list.length, 0, ...new Array(resultsToFetch));

    this.isCurrentRequestPending = true;
    this.listFetcher(resultsToFetch, this.nextPageToken)
      .then(response => {
        if (!response.nextPageToken) {
          this.haveMore = false;
        }
        this.totalResults = response.pageInfo.totalResults;
        this.nextPageToken = response.nextPageToken;
        this.resultsFetchedYet += response.items.length;

        this.list.splice(
          this.list.length - resultsToFetch,
          resultsToFetch,
          ...response.items
        );
      })
      .finally(() => {
        this.isCurrentRequestPending = false;
      });
  }
}
