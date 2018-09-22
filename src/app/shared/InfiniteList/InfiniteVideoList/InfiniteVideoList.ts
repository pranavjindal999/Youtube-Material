import InfiniteList from "@/app/shared/InfiniteList/InfiniteList";
import VideoTile from "@/app/shared/VideoTile/VideoTile.vue";
import { Component, Prop } from "vue-property-decorator";
import ScrollFire from "@/app/shared/ScrollFire/ScrollFire.vue";

@Component({
  components: { ScrollFire, VideoTile }
})
export default class InfiniteVideoList extends InfiniteList<
  GoogleApiYouTubeVideoResource
> {
  @Prop({ type: Boolean, default: false })
  hideChannelLink!: boolean;
}
