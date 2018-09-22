import moment from "moment";
import { routes } from "@/router/routeNames";
import { Vue, Watch, Component } from "vue-property-decorator";
import { Route } from "vue-router";
import VideoPage from "@/app/VideoBar/VideoPage/VideoPage.vue";
import { youtubeService } from "@/services/youtube";
import { EventBus, EventNames } from "@/services/eventBus";
import { humarizeDuration } from "@/extras/utils";

@Component({
  components: {
    VideoPage
  }
})
export default class VideoBar extends Vue {
  barMode: boolean = true;
  videoId: string = "";
  video: GoogleApiYouTubeVideoResource | null = null;
  playerRef: YT.Player | null = null;

  get videoThumbnal() {
    if (this.video) {
      return this.video.snippet.thumbnails.default.url;
    }
  }
  get timeElapsed() {
    if (this.video) {
      return "0:56";
    }
  }
  get title() {
    if (this.video) {
      return this.video.snippet.title;
    }
  }
  get duration() {
    if (this.video) {
      return humarizeDuration(this.video.contentDetails.duration);
    }
  }
  get elapsedPercent() {
    if (this.video) {
      return 43;
    }
  }
  get bufferPercent() {
    if (this.video) {
      return 65;
    }
  }

  created() {
    EventBus.$on(EventNames.playerReady, this.savePlayerRef);
    this.$router.afterEach(this.sniffVideoPage);
  }

  mounted() {
    this.sniffVideoPage(this.$route);
  }

  sniffVideoPage(to: Route) {
    if (to.name === routes.video.name) {
      let videoId = to.params[routes.video.params.id];
      this.updateVideoId(videoId);
      this.barMode = false;
    } else {
      this.barMode = true;
    }
  }

  savePlayerRef(player: YT.Player) {
    this.playerRef = player;
  }

  updateVideoId(videoId: string) {
    this.videoId = videoId;

    youtubeService.getVideoDetails([videoId]).then(result => {
      this.video = result.items[0];
    });
  }
}
