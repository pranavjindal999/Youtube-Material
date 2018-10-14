import { GA } from "./../../../init/ga";
import { Component, Prop, Mixins, Model } from "vue-property-decorator";
import { EventBus, EventNames } from "@/services/eventBus";
import { humanizeDuration } from "@/extras/utils";
import applicationable from "vuetify/es5/mixins/applicationable";
import { debounce } from "lodash";

@Component({
  components: {},
  name: "VideoBar"
})
export default class VideoBar extends Mixins(
  applicationable("bottom", ["height", "active"])
) {
  @Prop({ type: Number, required: true })
  forceUpdater!: number;

  @Prop({ type: Object, default: null })
  video!: GoogleApiYouTubeVideoResource | null;

  @Model("close", { type: Boolean, default: false })
  active!: boolean;

  playerRef: YT.Player | null = null;
  isLooping = false;

  height = 80;

  get videoThumbnail() {
    if (this.video) {
      return this.video.snippet.thumbnails.medium.url;
    }
  }
  get title() {
    if (this.video) {
      return this.video.snippet.title;
    }
  }

  get duration() {
    if (this.video) {
      return humanizeDuration(this.video.contentDetails.duration);
    }
  }

  get timeElapsed() {
    if (this.playerRef && this.forceUpdater) {
      return humanizeDuration(this.playerRef.getCurrentTime() * 1000);
    }
  }

  get elapsedPercent() {
    if (this.playerRef && this.forceUpdater) {
      return (
        (this.playerRef.getCurrentTime() * 100) / this.playerRef.getDuration()
      );
    }
  }

  get bufferPercent() {
    if (this.playerRef && this.forceUpdater) {
      return this.playerRef.getVideoLoadedFraction() * 100;
    }
  }

  get isPlaying() {
    if (this.playerRef && this.forceUpdater) {
      return (
        this.playerRef.getPlayerState() === YT.PlayerState.PLAYING ||
        this.playerRef.getPlayerState() === YT.PlayerState.BUFFERING
      );
    }
  }

  get isBuffering() {
    if (this.playerRef && this.forceUpdater) {
      return this.playerRef.getPlayerState() === YT.PlayerState.BUFFERING;
    }
  }

  get barTitleClass() {
    if (this.$vuetify.breakpoint.smAndDown) {
      return "mobile-bar-title mb-1";
    } else {
      return "title mb-2";
    }
  }

  get barTimerClass() {
    if (this.$vuetify.breakpoint.smAndDown) {
      return "mobile-bar-duration";
    } else {
      return "subheading";
    }
  }

  get thumnailBgStyle() {
    return {
      background: `linear-gradient(rgba(0, 0, 0, .7), rgba(0, 0, 0, 0.5)),url(${
        this.videoThumbnail
      })`
    };
  }

  /**
   * Following getter and setter overrides the applicationable mixin's internal
   * abstract method updateApplication.
   * Setter has to be defined because the mixin is not Class but Object and defines
   * the method a property.
   */
  get updateApplication() {
    return (): any => (!this.active ? 0 : this.height);
  }
  set updateApplication(fn) {}

  created() {
    EventBus.$on(EventNames.playerReady, this.savePlayerRef);
  }

  savePlayerRef(player: YT.Player) {
    this.playerRef = player;
    this.isLooping = false;

    this.playerRef.addEventListener("onStateChange", () => {
      if (
        this.playerRef!.getPlayerState() === YT.PlayerState.ENDED &&
        this.isLooping
      ) {
        this.playerRef!.playVideo();
      }
    });
  }

  close() {
    GA.sendGeneralEvent("engagement", "video-bar-stop");
    this.$emit("close", false);
  }

  getSeekToTime(percent: number) {
    if (this.playerRef) {
      let secondsToSeekTo = (this.playerRef.getDuration() * percent) / 100;
      return humanizeDuration(secondsToSeekTo * 1000);
    }
  }

  toogleLoop() {
    GA.sendGeneralEvent(
      "engagement",
      "video-bar-toggle-loop",
      this.isLooping ? "off" : "on"
    );

    if (this.playerRef) {
      this.isLooping = !this.isLooping;
      this.playerRef.setLoop(this.isLooping);
    }
  }

  sendSeekGAEvent = debounce(() => {
    GA.sendGeneralEvent("engagement", "video-bar-seek");
  }, 2000);

  seekVideo(seekToPercent: number) {
    this.sendSeekGAEvent();
    this.playerRef!.seekTo(
      (seekToPercent * this.playerRef!.getDuration()) / 100,
      true
    );
  }

  playPause() {
    GA.sendGeneralEvent(
      "engagement",
      "video-bar-play-pause",
      this.isPlaying ? "pause" : "play"
    );

    if (this.isPlaying) {
      this.playerRef!.pauseVideo();
    } else {
      this.playerRef!.playVideo();
    }
  }
}
