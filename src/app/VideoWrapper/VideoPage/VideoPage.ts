import InfiniteVideoList from "@/app/shared/InfiniteList/InfiniteVideoList/InfiniteVideoList.vue";
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { youtubeService } from "@/services/youtube";
import { DeferredObservable } from "@/extras/DeferredObservable";
import VideoCard from "@/app/VideoWrapper/VideoCard/VideoCard.vue";
import InfiniteCommentsList from "@/app/VideoWrapper/InfiniteCommentsList/InfiniteCommentsList.vue";

@Component({
  components: {
    InfiniteVideoList,
    VideoCard,
    InfiniteCommentsList
  }
})
export default class VideoPage extends Vue {
  @Prop({ type: String, required: true })
  videoId!: string;

  @Prop({ type: Object, default: null })
  video!: GoogleApiYouTubeVideoResource | null;

  resetDeferred = new DeferredObservable();

  get isMobile() {
    return this.$vuetify.breakpoint.smAndDown;
  }

  get relatedVideosFetcher(): ListFetcher<GoogleApiYouTubeVideoResource> {
    return (maxResults, pageToken) => {
      return youtubeService
        .searchVideos({
          relatedToVideoId: this.videoId,
          pageToken,
          maxResults
        })
        .then(searchResult => {
          let ids = searchResult.items.map(i => i.id.videoId);
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
      return youtubeService.getVideoComments({
        maxResults,
        pageToken,
        order: "time",
        videoId: this.videoId
      });
    };
  }

  @Watch("videoId")
  reset() {
    this.resetDeferred.next();
  }
}
