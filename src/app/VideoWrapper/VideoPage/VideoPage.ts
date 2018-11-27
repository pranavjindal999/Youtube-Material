import { pull } from "lodash";
import { featuredService } from "@/services/featured";
import { GA } from "@/init/ga";
import { CommentThreadOrder } from "./../../../services/youtube/youtubeServiceTypes";
import InfiniteVideoList from "@/app/shared/InfiniteList/InfiniteVideoList/InfiniteVideoList.vue";
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { youtubeService } from "@/services/youtube";
import { DeferredObservable } from "@/extras/DeferredObservable";
import VideoCard from "@/app/VideoWrapper/VideoCard/VideoCard.vue";
import InfiniteCommentsList from "@/app/VideoWrapper/InfiniteCommentsList/InfiniteCommentsList.vue";
import Helmet from "@/app/shared/Helmet/Helmet.vue";
import { pickRandom } from "@/extras/utils";

@Component({
  components: {
    InfiniteVideoList,
    VideoCard,
    InfiniteCommentsList,
    Helmet
  },
  name: "VideoPage"
})
export default class VideoPage extends Vue {
  @Prop({ type: String, required: true })
  videoId!: string;

  @Prop({ type: Object, default: null })
  video!: GoogleApiYouTubeVideoResource | null;

  resetDeferred = new DeferredObservable();
  resetDeferredComments = new DeferredObservable();

  commentThreadOrder = CommentThreadOrder.RELEVANCE;
  CommentThreadOrderEnum = CommentThreadOrder;

  get metaTitle() {
    if (this.video) {
      return this.video.snippet.title;
    }
  }

  get metaDescription() {
    if (this.video) {
      return this.video.snippet.description.substr(0, 250);
    }
  }

  get isMobile() {
    return this.$vuetify.breakpoint.smAndDown;
  }

  get relatedVideosFetcher(): ListFetcher<GoogleApiYouTubeVideoResource> {
    return (maxResults, pageToken) => {
      if (!this.videoId) {
        return Promise.reject();
      }

      return youtubeService
        .searchVideos({
          relatedToVideoId: this.videoId,
          pageToken,
          maxResults
        })
        .then(async searchResult => {
          let ids = searchResult.items.map(i => i.id.videoId);
          if (!pageToken) {
            let featuredVideoIds = await featuredService.getFeaturedVideos();
            pull(featuredVideoIds, this.videoId);
            ids.pop();
            ids.pop();
            ids = [...pickRandom(featuredVideoIds, 2), ...ids];
          }

          return youtubeService.getVideoDetails(ids).then(videoResult => {
            searchResult.items = videoResult.items as any;
            return searchResult as any;
          });
        });
    };
  }

  get videoCommentsFetcher(): ListFetcher<
    GoogleApiYoutubeCommentThreadResource
  > {
    return (maxResults, pageToken) => {
      if (!this.videoId) {
        return Promise.reject();
      }
      return youtubeService.getVideoComments({
        maxResults,
        pageToken,
        order: this.commentThreadOrder,
        videoId: this.videoId
      });
    };
  }

  @Watch("videoId")
  reset() {
    this.resetDeferred.next();
    this.resetDeferredComments.next();
  }

  @Watch("commentThreadOrder")
  resetComments() {
    if (this.commentThreadOrder) {
      this.resetDeferredComments.next();
    }
  }

  sendCommentSortGA() {
    GA.sendGeneralEvent(
      "engagement",
      "video-page-comment-sort",
      this.commentThreadOrder
    );
  }
}
