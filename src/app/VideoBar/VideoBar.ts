import moment from "moment";
import { routes } from "@/router/routeNames";
import { Vue, Watch, Component } from "vue-property-decorator";
import { Route } from "vue-router";
import VideoPage from "@/app/VideoBar/VideoPage/VideoPage.vue";
import { youtubeService } from "@/services/youtube";

@Component({
  components: {
    VideoPage
  }
})
export default class VideoBar extends Vue {
  barMode: boolean = true;
  videoId: string | null = null;
  video: GoogleApiYouTubeVideoResource | null = null;

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
    this.$router.afterEach(this.afterEachHook);
  }

  mounted() {
    this.afterEachHook(this.$route);
  }

  afterEachHook(to: Route) {
    if (to.name === routes.video.name) {
      let videoId = to.params[routes.video.params.id];
      if (videoId) {
        this.updateVideoId(videoId);
      } else {
        this.$router.push({ name: routes.home.name });
      }
      this.barMode = false;
    } else {
      this.barMode = true;
    }
  }

  updateVideoId(videoId: string) {
    this.videoId = videoId;

    youtubeService.getVideoDetails([videoId]).then(result => {
      this.video = result.items[0];
    });
  }
}
