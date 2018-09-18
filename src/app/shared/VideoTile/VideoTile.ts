import { Vue, Component, Prop } from "vue-property-decorator";
import FloatingDiv from "@/app/shared/FloatingDiv/FloatingDiv.vue";
import moment from "moment";
import { routes } from "@/router/routeNames";
import { Location } from "vue-router";

@Component({
  components: {
    FloatingDiv
  }
})
export default class VideoTile extends Vue {
  @Prop({ type: Boolean, default: false })
  hideChannelLink!: boolean;

  @Prop({ type: Object, required: false })
  video?: GoogleApiYouTubeVideoResource;

  get duration() {
    if (this.video) {
      let duration = moment
        .duration(this.video.contentDetails.duration)
        .format("h:m:ss");
      if (duration.includes(":")) {
        return duration;
      } else {
        return `0:${duration}`;
      }
    }
  }

  get uploaded() {
    return this.video && moment(this.video.snippet.publishedAt).fromNow();
  }

  get thumbnail() {
    return this.video && this.video.snippet.thumbnails.medium.url;
  }

  get views() {
    return (
      this.video &&
      `${Number(this.video.statistics.viewCount).toLocaleString()} ${this.$t(
        "views"
      )}`
    );
  }

  get title() {
    return this.video && this.video.snippet.title;
  }

  get channelName() {
    return this.video && this.video.snippet.channelTitle;
  }

  get videoRoute(): Location | undefined {
    if (this.video)
      return {
        name: routes.home.name,
        params: { id: this.video.id }
      };
  }

  get channelRoute(): Location | undefined {
    if (this.video)
      return {
        name: routes.channel.name,
        params: {
          [routes.channel.params.id]: this.video.snippet.channelId
        }
      };
  }
}
