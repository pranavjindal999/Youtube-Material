<template>
  <div 
    v-if="comment" 
    class="ma-0 px-4 py-3" >
    <v-layout 
      row>
      <router-link 
        class="no-link" 
        :to="commenterChannelRouter">
        <v-avatar class="mr-2">
          <v-img 
            :src="commenterAvatar" 
            alt="avatar">
            <FloatingDiv 
              slot="placeholder"/>
          </v-img>
        </v-avatar>
      </router-link>
      <div>
        <router-link 
          class="no-link" 
          :to="commenterChannelRouter">
          <span class="body-2 mr-2">{{ commenterName }}</span>
        </router-link>
        <span 
          class="captionGrey--text caption" 
          :title="commentTime">{{ humanizedCommentTime }}</span>
        <p v-async-bind="commentHtml"/>
      </div>
    </v-layout>
    <div class="smaller" >
      <slot name="replies"/>
    </div>
  </div>
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
.smaller {
  font-size: 0.9em;
}
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
.no-link {
  text-decoration: none;
  color: black;
}
</style>

<script>
import CommentItem from "./CommentItem.ts";
export default CommentItem;
</script>
