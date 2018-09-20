<template>
  <v-hover v-if="video">
    <v-card 
      :to="videoRoute"
      class="video-tile"
      slot-scope="{ hover }"
      :class="`elevation-${hover ? 6 : 1}`">
      <v-img
        :src="thumbnail"
        :aspect-ratio="16/9">
        <div class="time-bar">
          <span class="duration">{{ duration }}</span>
          <span class="uploaded">{{ uploaded }}</span>
        </div>
        <FloatingDiv 
          slot="placeholder"/>
      </v-img>
      
      <v-card-title 
        class="px-2 pt-2 pb-0" 
        primary-title>
        <div class="title-div">
          <h3 class="font-weight-light title body-1">{{ title }}</h3>
        </div>
        <div 
          :class="{'mb-2':hideChannelLink}" 
          class="caption caption-grey">{{ views }}</div>
      </v-card-title>
      <router-link 
        v-if="!hideChannelLink"
        :to="channelRoute" 
        class="channel-name text-truncate">
        {{ channelName }}
      </router-link>
    </v-card>
  </v-hover>
  <v-responsive 
    v-else
    :aspect-ratio="hideChannelLink?1.1:1">
    <FloatingDiv class="fl-img"/>
    <FloatingDiv class="fl-title1"/>
    <FloatingDiv class="fl-title2"/>
    <FloatingDiv class="fl-views"/>
    <FloatingDiv class="fl-channel"/>
  </v-responsive>
</template>

<style scoped>
.fl-img {
  height: 60%;
}
.fl-title1 {
  height: 5%;
  margin-top: 5%;
  width: 80%;
  padding: 2%;
}
.fl-title2 {
  height: 5%;
  margin-top: 2%;
  width: 30%;
}
.fl-views {
  height: 3%;
  margin-top: 2%;
  width: 20%;
}
.fl-channel {
  margin-top: 5%;
  height: 5%;
  width: 50%;
}

.video-tile {
  cursor: pointer;
}
.title-div {
  height: 32px;
}
.title {
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  height: 29px;
}
.caption {
  width: 100%;
}
.channel-name {
  display: block;
  text-decoration: none;
  font-size: 13px;
  color: #277bfa;
  padding: 4px;
  width: 100%;
  background: aliceblue;
  transition: all 0.3s;
}
.channel-name:hover {
  background: #e1effc;
  text-decoration: underline;
  cursor: pointer;
}
.time-bar {
  background: black;
  opacity: 0.7;
  position: absolute;
  width: 100%;
  height: 20px;
  font-size: 14px;
  color: white;
  bottom: 0;
}
.time-bar .duration {
  position: absolute;
  left: 4px;
}
.time-bar .uploaded {
  position: absolute;
  right: 4px;
}
</style>


<script>
import VideoTile from "./VideoTile.ts";
export default VideoTile;
</script>
