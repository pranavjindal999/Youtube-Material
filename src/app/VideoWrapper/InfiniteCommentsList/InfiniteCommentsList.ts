import { GA } from "./../../../init/ga";
import { youtubeService } from "@/services/youtube";
import CommentItem from "./CommentItem/CommentItem.vue";
import InfiniteList from "@/app/shared/InfiniteList/InfiniteList";
import { Component, Prop } from "vue-property-decorator";
import ScrollFire from "@/app/shared/ScrollFire/ScrollFire.vue";
import ErrorMessage from "@/app/shared/ErrorMessage/ErrorMessage.vue";

interface GoogleApiYoutubeCommentThreadResourceExtended
  extends GoogleApiYoutubeCommentThreadResource {
  nextPageToken: string;
  areRepliesLoading: boolean;
  areRepliesMutated: boolean;
}
@Component({
  components: {
    CommentItem,
    ScrollFire,
    ErrorMessage
  },
  name: "InfiniteCommentsList"
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

  getRepliesForCommentThread(
    commentThread: GoogleApiYoutubeCommentThreadResourceExtended
  ) {
    if (
      commentThread &&
      commentThread.replies &&
      commentThread.replies.comments
    ) {
      return commentThread.replies.comments;
    } else {
      return [];
    }
  }

  hasMoreReplies(commentThread: GoogleApiYoutubeCommentThreadResourceExtended) {
    if (commentThread && commentThread.snippet) {
      if (commentThread.areRepliesMutated && !commentThread.nextPageToken) {
        return false;
      }

      return (
        commentThread.snippet.totalReplyCount >
        this.getRepliesForCommentThread(commentThread).length
      );
    } else {
      return false;
    }
  }

  getUnloadedRepliesCount(
    commentThread: GoogleApiYoutubeCommentThreadResourceExtended
  ) {
    if (
      commentThread &&
      commentThread.snippet &&
      commentThread.replies &&
      commentThread.replies.comments
    )
      return (
        commentThread.snippet.totalReplyCount -
        commentThread.replies.comments.length
      );
  }

  loadMoreReplies(
    commentThread: GoogleApiYoutubeCommentThreadResourceExtended
  ) {
    GA.sendGeneralEvent("engagement", "load-more-replies");

    if (commentThread.areRepliesLoading) {
      return;
    }

    this.$set(commentThread, "areRepliesLoading", true);
    youtubeService
      .getCommentReplies({
        commentId: commentThread.snippet.topLevelComment.id,
        pageToken: commentThread.nextPageToken,
        maxResults: 8
      })
      .then(replies => {
        if (commentThread.nextPageToken) {
          commentThread.replies.comments.splice(
            commentThread.replies.comments.length,
            0,
            ...replies.items
          );
        } else {
          commentThread.replies.comments.splice(
            0,
            commentThread.replies.comments.length,
            ...replies.items
          );
        }
        this.$set(commentThread, "nextPageToken", replies.nextPageToken);

        /**
         * HACK: Sometimes Youtube API return less replies that actual count.
         * This is to prevent load more replies button from showing up and is used
         * in hasMoreReplies.
         */
        this.$set(commentThread, "areRepliesMutated", true);
      })
      .finally(() => {
        this.$set(commentThread, "areRepliesLoading", false);
      });
  }

  sendLoadMoreCommentsGA() {
    GA.sendGeneralEvent("engagement", "load-more-commments");
  }
}
