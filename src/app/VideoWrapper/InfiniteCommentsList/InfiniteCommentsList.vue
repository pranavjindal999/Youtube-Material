<template>
  <v-card>
    <CommentItem
      v-for="(comment, $index) in list" 
      :key="$index"
      :comment="comment && comment.snippet.topLevelComment">
      <template slot="replies">
        <CommentItem
          v-for="(reply, $indexReplies) in (comment && comment.replies && comment.replies.comments)" 
          :key="$indexReplies"
          :comment="reply"/>
      </template>
    </CommentItem>
    <v-btn 
      flat
      color="primary"
      v-if="manual" 
      @click="onScrollFire" 
      block>{{ $t('loadMoreComments') }}</v-btn>
    <ScrollFire 
      v-if="!manual"
      :have-more="haveMore" 
      @fire="onScrollFire"/>
  </v-card>
</template>

<style scoped>
</style>

<script>
import InfiniteCommentsList from "./InfiniteCommentsList.ts";
export default InfiniteCommentsList;
</script>
