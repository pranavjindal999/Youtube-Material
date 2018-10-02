<template>
  <v-card>
    <template v-if="!errorMessageKey">
      <slot name="top"/>
      <CommentItem
        v-for="(commentThread, $index) in list" 
        :key="$index"
        :comment="commentThread && commentThread.snippet.topLevelComment">
        <template slot="replies">
          <v-slide-y-reverse-transition group>
            <CommentItem
              v-for="(reply, $replyIndex) in getRepliesForCommentThread(commentThread)" 
              :key="$replyIndex"
              :comment="reply"/>
          </v-slide-y-reverse-transition>
          <div 
            key="load-more" 
            class="mt-1" 
            @click="loadMoreReplies(commentThread)" 
            v-if="hasMoreReplies(commentThread)">
            <div class="load-reply-link youtubeRed--text">
              {{ $tc('loadMoreReplies', getUnloadedRepliesCount(commentThread), 
                     {unloadedCount: getUnloadedRepliesCount(commentThread) }) }}
            </div>
            <v-icon 
              :class="{'spin': commentThread.areRepliesLoading}" 
              color="youtubeRed" 
              size="13">sync</v-icon>
          </div>
        </template> 
        <v-divider/>
      </CommentItem>

      <v-btn 
        flat
        class="mt-0"
        color="primary"
        v-if="manual && haveMore" 
        @click="onScrollFire" 
        block>
        {{ $t('loadMoreComments') }}      
      </v-btn>
      <ScrollFire 
        v-if="!manual"
        :have-more="haveMore" 
        @fire="onScrollFire"/>
    </template>
    <ErrorMessage 
      class="py-3" 
      v-else 
      :text="$t(errorMessageKey)"/>
  </v-card>
</template>

<style scoped>
.load-reply-link {
  font-size: 12px;
  font-size: 13px;
  margin-left: 15px;
  margin-bottom: 10px;
  cursor: pointer;
  display: inline-block;
  margin-right: 5px;
  user-select: none;
}
.load-reply-link:hover {
  text-decoration: underline;
}
</style>

<script>
import InfiniteCommentsList from "./InfiniteCommentsList.ts";
export default InfiniteCommentsList;
</script>
