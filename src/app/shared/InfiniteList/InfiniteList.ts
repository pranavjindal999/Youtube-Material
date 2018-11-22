import { Onable } from "./../../../extras/DeferredObservable";
import { Vue, Component, Prop } from "vue-property-decorator";

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
  errorMessageKey = "";

  /**
   * Few Google APIs result wrong count of total results, like comments thread
   */
  ignoreTotalResults?: boolean = false;

  get maxResults(): number {
    if (this.$vuetify.breakpoint.smAndDown) {
      return 8;
    } else if (this.$vuetify.breakpoint.mdAndDown) {
      return 12;
    } else {
      return 18;
    }
  }

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
    this.errorMessageKey = "";
    this.onScrollFire();
  }

  calcResultsToFetch() {
    if (this.totalResults && !this.ignoreTotalResults) {
      return Math.min(
        this.maxResults,
        this.totalResults - this.resultsFetchedYet
      );
    } else {
      return this.maxResults;
    }
  }

  async onScrollFire() {
    if (!this.haveMore || this.isCurrentRequestPending || !navigator.onLine) {
      return;
    }

    let resultsToFetch = this.calcResultsToFetch();

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

        /**
         * HACK: This is due to buggy Youtube APIs. APIs sometimes return empty dataset
         * despite greater maxResults.
         */
        if (!response.items.length) {
          this.haveMore = false;
          this.nextPageToken = "";
          this.totalResults = this.list.length;
        }
      })
      .catch(err => {
        this.errorMessageKey = err;
        this.list.splice(this.list.length - resultsToFetch, resultsToFetch);
        this.haveMore = false;
      })
      .finally(() => {
        this.isCurrentRequestPending = false;
      });
  }
}
