import InfiniteList from "@/app/shared/InfiniteList/InfiniteList";
import VideoTile from "@/app/shared/VideoTile/VideoTile.vue";
import { Component, Prop } from "vue-property-decorator";
import ScrollFire from "@/app/shared/ScrollFire/ScrollFire.vue";
import { LangKeys } from "@/translations";
import ErrorMessage from "@/app/shared/ErrorMessage/ErrorMessage.vue";

@Component({
  components: { ScrollFire, VideoTile, ErrorMessage },
  name: "InfiniteVideoList"
})
export default class InfiniteVideoList extends InfiniteList<
  GoogleApiYouTubeVideoResource
> {
  @Prop({ type: Boolean, default: false })
  hideChannelLink!: boolean;

  @Prop({ type: Boolean, default: false })
  twoColumn!: boolean;

  @Prop({ type: String, default: LangKeys.noVideoFound })
  noVideoText?: string;

  get layoutProps() {
    if (this.twoColumn) {
      return {
        xs6: true
      };
    } else {
      return {
        xs6: true,
        md3: true,
        lg2: true
      };
    }
  }
}
