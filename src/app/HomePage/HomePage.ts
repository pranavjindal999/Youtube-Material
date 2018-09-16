import { Vue, Component } from "vue-property-decorator";
import YoutubePlayer from "../shared/YoutubePlayer/YoutubePlayer.vue";

@Component({
  components: {
    YoutubePlayer
  }
})
export default class HomePage extends Vue {}
