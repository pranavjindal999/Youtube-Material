import { GA } from "./../../../init/ga";
import { Vue, Component, Prop } from "vue-property-decorator";
import FloatingDiv from "@/app/shared/FloatingDiv/FloatingDiv.vue";
import moment from "moment";
import { routes } from "@/router/routeNames";
import { Location } from "vue-router";
import { humanizeDuration, humanizeNumber } from "@/extras/utils";
import config from "@/config";

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
      return humanizeDuration(this.video.contentDetails.duration);
    }
  }

  get humaizedUploaded() {
    return this.video && moment(this.video.snippet.publishedAt).fromNow();
  }

  get uploaded() {
    return (
      this.video &&
      moment(this.video.snippet.publishedAt).format(config.longDateTimeFormat)
    );
  }

  get thumbnail() {
    return this.video && this.video.snippet.thumbnails.medium.url;
  }

  get humaizedViews() {
    return (
      this.video &&
      `${humanizeNumber(this.video.statistics.viewCount)} ${this.$t("views")}`
    );
  }

  get csvViews() {
    return (
      this.video &&
      `${Number(this.video.statistics.viewCount).toLocaleString()}  ${this.$t(
        "views"
      )}`
    );
  }

  get isLive() {
    return this.video && this.video.snippet.liveBroadcastContent === "live";
  }

  get title() {
    return this.video && this.video.snippet.title;
  }

  get channelName() {
    return this.video && this.video.snippet.channelTitle;
  }

  get videoRoute(): Location | undefined {
    if (this.video) {
      return {
        name: routes.video.name,
        params: { id: this.video.id }
      };
    }
  }

  get channelRoute(): Location | undefined {
    if (this.video) {
      return {
        name: routes.channel.name,
        params: {
          [routes.channel.params.id]: this.video.snippet.channelId
        }
      };
    }
  }

  sendTileClickGA() {
    if (this.video) {
      GA.sendGeneralEvent(
        "engagement",
        "click-video-tile",
        this.video.snippet.title
      );
    }
  }
  sendChannelClickGA() {
    if (this.video) {
      GA.sendGeneralEvent(
        "engagement",
        "click-video-tile-channel",
        this.video.snippet.channelTitle
      );
    }
  }
}
