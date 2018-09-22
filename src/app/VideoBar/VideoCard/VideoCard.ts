import { routes } from "./../../../router/routeNames";
import { Location } from "vue-router";
import FloatingDiv from "@/app/shared/FloatingDiv/FloatingDiv.vue";
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import YoutubePlayer from "@/app/shared/YoutubePlayer/YoutubePlayer.vue";
import { LangKeys } from "@/translations";
import { linkify } from "@/services/linkify";
import { youtubeService } from "@/services/youtube";

@Component({
  components: {
    YoutubePlayer,
    FloatingDiv
  }
})
export default class VideoCard extends Vue {
  @Prop({ type: String, required: true })
  videoId!: string;

  @Prop({ type: Object, default: null })
  video!: GoogleApiYouTubeVideoResource | null;

  channel: GoogleApiYouTubeChannelResource | null = null;

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

  get likePercent() {
    if (this.video) {
      return (this.likeCount! * 100) / (this.dislikeCount! + this.likeCount!);
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

  created() {
    this.getChannel();
  }

  @Watch("video")
  getChannel() {
    if (this.video) {
      youtubeService
        .getChannelDetails([this.video.snippet.channelId])
        .then(result => {
          this.channel = result.items[0];
        });
    }
  }
}
