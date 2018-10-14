import ChannelTile from "@/app/shared/ChannelTile/ChannelTile.vue";
import { Component, Prop } from "vue-property-decorator";
import ScrollFire from "@/app/shared/ScrollFire/ScrollFire.vue";
import InfiniteList from "@/app/shared/InfiniteList/InfiniteList";
import { LangKeys } from "@/translations";
import ErrorMessage from "@/app/shared/ErrorMessage/ErrorMessage.vue";

@Component({
  components: { ScrollFire, ChannelTile, ErrorMessage },
  name: "InfiniteChannelList"
})
export default class InfiniteChannelList extends InfiniteList<
  GoogleApiYouTubeChannelResource
> {
  @Prop({ type: String, default: LangKeys.noVideoFound })
  noChannelText?: string;
}
