import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { asyncYoutubeIframeAPI } from "@/services/youtube/youtubeIframe";
import { randomString } from "lodash";
import FloatingDiv from "@/app/shared/FloatingDiv/FloatingDiv.vue";
@Component({
  components: {
    FloatingDiv
  }
})
export default class YoutubePlayer extends Vue {
  player: YT.Player | null = null;
  asyncPlayerState!: Promise<void>;
  elementToAttach = randomString();
  isPlayerReady: boolean = false;

  @Prop({ validator: value => typeof value === "string" || value === null })
  videoId: string | null = null;

  async mounted() {
    await this.makePlayerReady();
  }

  @Watch("videoId")
  async changeVideo(newId: string, oldId: string) {
    await this.asyncPlayerState;

    let player = this.player!;
    if (this.videoId) {
      if (newId !== oldId) {
        player.loadVideoById(this.videoId);
      }
    } else {
      player.stopVideo();
    }
  }

  async makePlayerReady() {
    this.asyncPlayerState = new Promise(async resolve => {
      await asyncYoutubeIframeAPI;
      this.player = new YT.Player(this.elementToAttach, {
        height: "390",
        width: "640",
        videoId: this.videoId || "",
        events: {
          onReady: () => {
            this.isPlayerReady = true;
            this.player!.playVideo();
            resolve();
          }
        }
      });
    });
  }
}
