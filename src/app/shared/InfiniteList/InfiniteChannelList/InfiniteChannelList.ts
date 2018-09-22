import ChannelTile from "@/app/shared/ChannelTile/ChannelTile.vue";
import { Component } from "vue-property-decorator";
import ScrollFire from "@/app/shared/ScrollFire/ScrollFire.vue";
import InfiniteList from "@/app/shared/InfiniteList/InfiniteList";

@Component({
  components: { ScrollFire, ChannelTile }
})
export default class InfiniteChannelList extends InfiniteList<
  GoogleApiYouTubeChannelResource
> {}
