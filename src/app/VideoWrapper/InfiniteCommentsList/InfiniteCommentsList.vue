<template>
  <v-card>
    <CommentItem
      v-for="(comment, $index) in list" 
      :key="$index"
      :comment="comment && comment.snippet.topLevelComment">
      <template slot="replies">
        <CommentItem
          v-for="(comment, $indexReplies) in (comment && comment.replies)" 
          :key="$indexReplies"
          :comment="comment"/>
      </template>
    </CommentItem>
    <ScrollFire 
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
