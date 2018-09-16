import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import VideoTile from "@/app/shared/VideoTile/VideoTile.vue";
import { youtubeService } from "@/services/youtube";
import { map, find } from "lodash";
import { Deferred } from "@/extras/Deferred";

@Component({
  components: { VideoTile }
})
export default class SearchResults extends Vue {
  @Prop({ type: String, required: true })
  query!: string;

  videos?: (GoogleApiYouTubeSearchResource & {
    videoDetails?: Promise<GoogleApiYouTubeVideoResource>;
    _deferred?: Deferred<GoogleApiYouTubeVideoResource>;
  })[] = [];

  nextPageToken?: string;
  previousPageToken?: string;

  @Watch("query")
  search() {
    youtubeService
      .searchVideos({
        query: this.query
      })
      .then(result => {
        this.videos = result.items;
        this.updateVideoDetails();
        this.nextPageToken = result.nextPageToken;
        this.previousPageToken = result.prevPageToken;
      });
  }

  updateVideoDetails() {
    this.videos!.forEach(v => {
      v._deferred = new Deferred<GoogleApiYouTubeVideoResource>();
      v.videoDetails = v._deferred.promise;
    });

    let ids = map(this.videos, v => v.id.videoId);
    youtubeService.getVideoDetails(ids).then(result => {
      this.videos!.forEach(i => {
        let videoDetails = find(result.items, { id: i.id.videoId })!;
        i._deferred!.resolve(videoDetails);
      });
    });
  }

  mounted() {
    this.search();
  }
}
