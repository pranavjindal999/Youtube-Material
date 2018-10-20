import { sleep } from "@/extras/sleep";
import { EventNames, EventBus } from "./../../../services/eventBus/index";
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import FloatingDiv from "@/app/shared/FloatingDiv/FloatingDiv.vue";
import { randomString } from "@/extras/utils";
import config from "@/config";
@Component({
  components: {
    FloatingDiv
  },
  name: "YoutubePlayer"
})
export default class YoutubePlayer extends Vue {
  player: YT.Player | null = null;
  playerInitializationPromise: Promise<void> | null = null;
  elementToAttach = randomString();
  isPlayerReady: boolean = false;

  @Prop({ type: String, required: true })
  videoId!: string;

  get computedVideoId(): string {
    return config.local ? "" : this.videoId;
  }

  async mounted() {
    await sleep(5000);
    if (!this.playerInitializationPromise) {
      this.initializePlayer();
    }
  }

  @Watch("videoId")
  async changeVideo(newId: string, oldId: string) {
    if (!this.playerInitializationPromise) {
      await this.initializePlayer();
    }
    await this.playerInitializationPromise;

    if (newId !== oldId) {
      this.player!.loadVideoById(this.computedVideoId);
    }
  }

  async initializePlayer() {
    this.playerInitializationPromise = new Promise(async resolve => {
      let iFrameESM = await import(/* webpackMode: "eager" */ "@/services/youtube/youtubeIframe");
      await iFrameESM.asyncYoutubeIframeAPI;

      this.player = new YT.Player(this.elementToAttach, {
        playerVars: {
          autoplay: 0,
          modestbranding: 1,
          rel: 0,
          hl: this.$i18n.locale,
          origin: window.location.origin
        },
        videoId: this.computedVideoId,
        events: {
          onReady: () => {
            this.isPlayerReady = true;
            this.player!.playVideo();
            EventBus.$emit(EventNames.playerReady, this.player);
            resolve();
          }
        }
      });
    });
  }
}
