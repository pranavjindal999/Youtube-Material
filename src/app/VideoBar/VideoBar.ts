import { Vue, Component } from "vue-property-decorator";
import YoutubePlayer from "@/app/shared/YoutubePlayer/YoutubePlayer.vue";

@Component({
  components: {
    YoutubePlayer
  }
})
export default class VideoBar extends Vue {}
