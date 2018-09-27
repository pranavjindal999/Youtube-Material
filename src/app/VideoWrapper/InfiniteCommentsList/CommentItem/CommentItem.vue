<template>
  <v-layout 
    v-if="comment" 
    class="ma-0 pa-2" 
    row>
    <v-avatar>
      <img 
        :src="commenterAvatar" 
        alt="avatar">
    </v-avatar>
    <slot name="replies"/>
  </v-layout>
  <v-responsive 
    v-else
    :aspect-ratio="10">
    <div class="fl-flex pa-3">
      <FloatingDiv class="fl-img"/>
      <div class="fl-text">
        <FloatingDiv class="fl-name"/>
        <FloatingDiv class="fl-comment"/>
        <FloatingDiv class="fl-comment1"/>
      </div>
    </div>
  </v-responsive>
</template>

<style scoped>
.fl-flex {
  display: flex;
  flex-direction: row;
  height: 100%;
}
.fl-img {
  border-radius: 50%;
  height: 100%;
  width: 7%;
}
.fl-text {
  width: 100%;
  margin-left: 2%;
}
.fl-name {
  height: 30%;
  width: 30%;
}
.fl-comment {
  height: 15%;
  width: 80%;
  margin-top: 1%;
}
.fl-comment1 {
  height: 15%;
  width: 50%;
  margin-top: 1%;
}
</style>

<script>
import CommentItem from "./CommentItem.ts";
export default CommentItem;
</script>
