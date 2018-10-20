import { GA } from "./../../../../init/ga";
import { linkify } from "@/services/linkify";
import { routes } from "@/router/routeNames";
import { Location } from "vue-router";
import { Vue, Component, Prop } from "vue-property-decorator";
import config from "@/config";
import FloatingDiv from "@/app/shared/FloatingDiv/FloatingDiv.vue";
import { fromNow, formatDate } from "@/extras/dateUtils";

@Component({
  components: {
    FloatingDiv
  },
  name: "CommentItem"
})
export default class CommentItem extends Vue {
  @Prop({ type: Object, required: false })
  comment?: GoogleApiYoutubeCommentResource;

  get commenterAvatar() {
    if (this.comment) {
      return this.comment.snippet.authorProfileImageUrl;
    }
  }

  get commenterChannelRouter(): Location | undefined {
    if (this.comment) {
      return {
        name: routes.channel.name,
        params: {
          [routes.channel.params.id]: this.comment.snippet.authorChannelId.value
        }
      };
    }
  }

  get commenterName() {
    if (this.comment) {
      return this.comment.snippet.authorDisplayName;
    }
  }

  get humanizedCommentTime() {
    if (this.comment) {
      return fromNow(this.comment.snippet.publishedAt);
    }
  }

  get commentTime() {
    if (this.comment) {
      return formatDate(
        this.comment.snippet.publishedAt,
        config.longDateTimeFormat
      );
    }
  }

  get commentHtml() {
    if (this.comment) {
      return linkify(this.comment.snippet.textOriginal);
    }
  }

  get likeCount() {
    if (this.comment) {
      return (+this.comment.snippet.likeCount).toLocaleString();
    }
  }

  sendAuthorClickGA() {
    GA.sendGeneralEvent(
      "engagement",
      "comment-item-author-click",
      this.commenterName
    );
  }
}
