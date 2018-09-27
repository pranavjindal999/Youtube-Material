import CommentItem from "./CommentItem/CommentItem.vue";
import InfiniteList from "@/app/shared/InfiniteList/InfiniteList";
import { Component, Prop } from "vue-property-decorator";
import ScrollFire from "@/app/shared/ScrollFire/ScrollFire.vue";

@Component({
  components: {
    CommentItem,
    ScrollFire
  }
})
export default class InfiniteCommentsList extends InfiniteList<
  GoogleApiYoutubeCommentThreadResource
> {
  @Prop({ type: Boolean, default: false })
  manual!: boolean;

  ignoreTotalResults = true;

  created() {
    if (this.manual) {
      this.onScrollFire();
    }
  }

  get maxResults(): number {
    if (this.$vuetify.breakpoint.smAndDown) {
      return 5;
    } else {
      return 8;
    }
  }
}
