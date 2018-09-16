import { Vue, Component, Prop } from "vue-property-decorator";
import { asyncYoutubeIframeAPI } from "@/services/youtube/youtubeIframe";
import { randomString } from "lodash";

@Component
export default class YoutubePlayer extends Vue {
  player: YT.Player | null = null;
  isPlayerReady = false;
  id = randomString();

  @Prop({
    type: String,
    required: true
  })
  videoId!: string;

  async mounted() {
    await asyncYoutubeIframeAPI;

    this.player = new YT.Player(this.id, {
      height: "390",
      width: "640",
      videoId: this.videoId,
      events: {
        onReady: () => {
          this.isPlayerReady = true;
          // this.player!.playVideo();
        }
      }
    });
  }
}
