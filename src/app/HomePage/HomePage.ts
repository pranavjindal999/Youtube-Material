import { Vue, Component, Prop } from "vue-property-decorator";
import YoutubePlayer from "../shared/YoutubePlayer/YoutubePlayer.vue";
import VideoTile from "@/app/shared/VideoTile/VideoTile.vue";

@Component({
  components: {
    YoutubePlayer,
    VideoTile
  }
})
export default class HomePage extends Vue {
  @Prop()
  id!: string;
}
