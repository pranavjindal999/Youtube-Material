<template>
  <div 
    v-if="comment"
  >
    <v-layout 
      class="ma-0 px-3 pt-3"
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
          
        <span 
          v-if="likeCount > 0"
          class="ml-2 caption">
          <v-icon 
            class="mr-1" 
            size="14">thumb_up</v-icon>
          <span>{{ likeCount }}</span>
        </span>
        <p v-async-bind="commentHtml"/>
      </div>
    </v-layout>
    <div class="smaller ml-3" >
      <slot name="replies"/>
    </div>
    <slot/>
  </div>
  <v-responsive 
    v-else
    :aspect-ratio="10">
    <div class="parent">
      <v-avatar 
        class="avatar" 
        size="56">
        <FloatingDiv class="fl-img"/>
      </v-avatar>
      <FloatingDiv class="fl-name"/>
      <FloatingDiv class="fl-comment"/>
      <FloatingDiv class="fl-comment1"/>
    </div>
  </v-responsive>
</template>

<style scoped>
.smaller {
  font-size: 0.9em;
}
.parent {
  padding: 2%;
  height: 100%;
}
.avatar {
  float: left;
  margin-right: 10px;
}
.fl-img {
  border-radius: 50%;
}
.fl-name {
  height: 24%;
  width: 30%;
  margin-top: 1%;
}
.fl-comment {
  height: 12%;
  width: 80%;
  margin-top: 1%;
}
.fl-comment1 {
  height: 12%;
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
