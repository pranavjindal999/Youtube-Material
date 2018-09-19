import YoutubePlayer from "@/app/shared/YoutubePlayer/YoutubePlayer.vue";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {
    YoutubePlayer
  }
})
export default class VideoPage extends Vue {
  @Prop({ validator: value => typeof value === "string" || value === null })
  videoId: string | null = null;
}
