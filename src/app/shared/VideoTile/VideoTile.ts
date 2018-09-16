import { Vue, Component, Prop } from "vue-property-decorator";
import FloatingDiv from "@/app/shared/FloatingDiv/FloatingDiv.vue";
import moment from "moment";
import { routes } from "@/router/routeNames";

@Component({
  components: {
    FloatingDiv
  }
})
export default class VideoTile extends Vue {
  @Prop({ type: Boolean, default: false })
  channelLink!: boolean;

  @Prop({ type: Object, required: true })
  video!: GoogleApiYouTubeSearchResource & {
    videoDetails: Promise<GoogleApiYouTubeVideoResource>;
  };

  get duration() {
    return this.video.videoDetails.then(d => {
      return moment.duration(d.contentDetails.duration).format("h:m:ss");
    });
  }

  get uploaded() {
    return moment(this.video.snippet.publishedAt).fromNow();
  }

  get thumbnail() {
    return this.video.snippet.thumbnails.medium.url;
  }

  get views() {
    return this.video.videoDetails.then(d => {
      return `${Number(d.statistics.viewCount).toLocaleString()} ${this.$t(
        "views"
      )}`;
    });
  }

  get title() {
    return this.video.snippet.title;
  }

  get channelName() {
    return this.video.snippet.channelTitle;
  }

  get videoRoute() {
    return { name: routes.home.name, params: { id: this.video.id.videoId } };
  }

  get channelRoute() {
    return {};
  }
}
