import { GA } from "./../../../init/ga";
import { routes } from "./../../../router/routeNames";
import { Location } from "vue-router";
import FloatingDiv from "@/app/shared/FloatingDiv/FloatingDiv.vue";
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import YoutubePlayer from "@/app/shared/YoutubePlayer/YoutubePlayer.vue";
import { LangKeys } from "@/translations";
import { linkify } from "@/services/linkify";
import { youtubeService } from "@/services/youtube";
import config from "@/config";
import { humanizeNumber } from "@/extras/utils";
import { formatDate } from "@/extras/dateUtils";

@Component({
  components: {
    YoutubePlayer,
    FloatingDiv
  },
  name: "VideoCard"
})
export default class VideoCard extends Vue {
  @Prop({ type: String, required: true })
  videoId!: string;

  @Prop({ type: Object, default: null })
  video!: GoogleApiYouTubeVideoResource | null;

  channel: GoogleApiYouTubeChannelResource | null = null;
  isDescriptionExpanded = false;

  $refs!: {
    expandCollapseBtn: Vue;
  };

  get title() {
    if (this.video) {
      return this.video.snippet.title;
    }
  }

  get desciption() {
    if (this.video) {
      return linkify(this.video.snippet.description);
    }
  }

  get views() {
    if (this.video) {
      return `${(+this.video.statistics.viewCount).toLocaleString()} ${this.$t(
        LangKeys.views
      )}`;
    }
  }

  get uploaded() {
    if (this.video) {
      return `${this.$t(LangKeys.uploaded)}: ${formatDate(
        this.video.snippet.publishedAt,
        config.longDateTimeFormat
      )}`;
    }
  }

  get likePercent() {
    if (this.video) {
      return (
        (+this.likeCount! * 100) / (+this.dislikeCount! + +this.likeCount!)
      );
    }
  }

  get likeCount() {
    if (this.video) {
      return this.video.statistics.likeCount;
    }
  }

  get dislikeCount() {
    if (this.video) {
      return this.video.statistics.dislikeCount;
    }
  }

  get humanizedLikeCount() {
    if (this.video) {
      return humanizeNumber(this.video.statistics.likeCount);
    }
  }

  get humanizedDislikeCount() {
    if (this.video) {
      return humanizeNumber(this.video.statistics.dislikeCount);
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

  get channelName() {
    if (this.video) {
      return this.video.snippet.channelTitle;
    }
  }

  get channelThumbnail() {
    if (this.channel) {
      return this.channel.snippet.thumbnails.medium.url;
    }
  }

  @Watch("video", { immediate: true })
  getChannel() {
    if (this.video && this.videoId) {
      youtubeService
        .getChannelDetails([this.video.snippet.channelId])
        .then(result => {
          this.channel = result.items[0];
          this.isDescriptionExpanded = false;
        });
    }
  }

  expandeCollapseDesc() {
    GA.sendGeneralEvent(
      "engagement",
      "video-card-desc-expand-collapse",
      this.isDescriptionExpanded ? "collapse" : "expand"
    );
    this.isDescriptionExpanded = !this.isDescriptionExpanded;

    /**
     * Sometimes the expanded description si so large that
     * after collapse, the viewport becomes blank.
     */
    this.$nextTick(() => {
      if (!this.isDescriptionExpanded) {
        this.$refs.expandCollapseBtn.$el.scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  }

  sendChannelRouteGA() {
    GA.sendGeneralEvent(
      "engagement",
      "video-card-channel-click",
      this.channelName
    );
  }
}
