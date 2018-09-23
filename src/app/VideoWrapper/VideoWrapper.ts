import VideoBar from "./VideoBar/VideoBar.vue";
import { routes } from "@/router/routeNames";
import { Vue, Component } from "vue-property-decorator";
import { Route } from "vue-router";
import VideoPage from "@/app/VideoWrapper/VideoPage/VideoPage.vue";
import { youtubeService } from "@/services/youtube";

@Component({
  components: {
    VideoPage,
    VideoBar
  }
})
export default class VideoWrapper extends Vue {
  barMode: boolean = true;
  videoId: string = "";
  video: GoogleApiYouTubeVideoResource | null = null;
  forceUpdater = 1;
  timer: null | NodeJS.Timer = null;
  videoPageClass = "";

  mounted() {
    this.$router.afterEach(this.sniffVideoPage);
    this.sniffVideoPage(this.$route);
  }

  sniffVideoPage(to: Route) {
    if (to.name === routes.video.name) {
      this.updateVideoId(to.params[routes.video.params.id]);
      this.barMode = false;
      this.stopUpdatingUI();
    } else {
      this.barMode = true;
      this.startUpdatingUI();
    }
  }

  startUpdatingUI() {
    if (this.videoId && !this.timer) {
      this.timer = setInterval(() => {
        this.forceUpdater++;
      }, 200);
    }
  }

  stopUpdatingUI() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  updateVideoId(videoId: string) {
    if (this.videoId === videoId) {
      return;
    }

    this.videoId = videoId;
    this.video = null;
    youtubeService.getVideoDetails([videoId]).then(result => {
      this.video = result.items[0];
    });
  }

  goToVideo() {
    this.$router.push({
      name: routes.video.name,
      params: {
        [routes.video.params.id]: this.videoId
      }
    });
  }

  cleanVideoState() {
    this.video = null;
    this.stopUpdatingUI();
    this.videoId = "";
  }

  /**
   * ---- HACK ----
   * Following hooks fix two issues:
   * 1. IFrame API doesn't let control the player is if lies under any "display: none" element.
   *  So, to avoid that, after the animation of hiding is complete, we remove display:none, and add
   * no opacity and fixed position so that iframe always stays in viewport event if hidden.
   *
   * 2. Another issue was with the ScrollFire. As animation takes a while to complete,
   * the ScrollFire calculates it's state while is is not in viewport. After the animation completes,
   * ScrollFire gets into the viewport, but not because page scrolled, but because of reflow.
   * So, after the animation is completed, we fire a fake scroll event to wake ScrollFire.
   */
  beforeVideoPageOpen() {
    this.videoPageClass = "";
  }

  afterVideoPageClose() {
    this.videoPageClass = "iframe-hide-hack";
    window.dispatchEvent(new Event("scroll"));
  }
}
