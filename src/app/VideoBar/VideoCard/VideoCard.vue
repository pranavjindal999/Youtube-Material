<template>
  <div>
    <v-card>
      <YoutubePlayer :video-id="videoId"/>
      <template v-if="video">
        <v-card-title primary-title>
          <v-layout 
            row 
            wrap>
            <v-flex 
              xs12 
              class="headline">{{ title }}</v-flex>
            <v-flex class="pt-0 caption-grey">{{ views }}</v-flex>
          </v-layout>
        </v-card-title>
        <v-divider/>
        <v-layout 
          row 
          justify-space-between
          class="pa-2 px-3"
          wrap>
          <v-flex xs9>
            <router-link 
              class="channel-chip font-weight-light" 
              :to="channelRoute">
              <v-chip>
                <v-avatar>
                  <img :src="channelThumbnail">
                </v-avatar>
                <span class="channel-name">{{ channelName }}</span>
              </v-chip>
            </router-link>
          </v-flex>
          <v-flex>
            <v-layout 
              row 
              wrap 
              justify-space-between>
              <v-flex 
                class="pa-0" 
                xs6>
                <v-icon>thumb_up</v-icon>
                <span class="title caption-grey pl-1">{{ likeCount }}</span>
              </v-flex>
              <v-flex 
                justify-end
                class="pa-0" 
                xs6>
                <v-icon>thumb_down</v-icon>
                <span class="title caption-grey pl-1">{{ dislikeCount }}</span>
              </v-flex>
              <v-flex 
                class="pa-0" 
                xs12> 
                <v-progress-linear
                  background-color="error"
                  color="success"
                  :value="likePercent"/>
              </v-flex>
             
            </v-layout>
          </v-flex>



        </v-layout>
        <v-divider/>

        <v-flex 
          xs12 
          v-async-bind="desciption"/>
      </template>
      <template v-else>
        <div class="fl-video-details">
          <FloatingDiv class="fl-title" />
          <FloatingDiv class="fl-views" />
          <FloatingDiv class="fl-divider" />
          <div class="fl-row">
            <FloatingDiv class="fl-channel" />
            <FloatingDiv class="fl-meter" />
          </div>
          <FloatingDiv class="fl-desc1" />
          <FloatingDiv class="fl-desc2" />
          <FloatingDiv class="fl-desc3" />
        </div>
      </template>

    </v-card>
  </div>
        
</template>

<style scoped>
.channel-chip {
  text-decoration: none;
  font-size: 16px !important;
}
.channel-chip * {
  cursor: pointer !important;
}
.channel-chip .channel-name {
  font-size: 16px;
}

.fl-video-details {
  padding: 16px;
}
.fl-title {
  height: 16px;
  width: 40%;
  margin-bottom: 12px;
}
.fl-views {
  height: 12px;
  width: 15%;
  margin-bottom: 20px;
}
.fl-divider {
  height: 1px;
  margin-bottom: 20px;
}
.fl-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
}
.fl-channel {
  height: 22px;
  width: 15%;
}
.fl-meter {
  height: 22px;
  width: 15%;
}
.fl-desc1 {
  height: 12px;
  width: 70%;
  margin-bottom: 20px;
}
.fl-desc2 {
  height: 12px;
  width: 50%;
  margin-bottom: 20px;
}
.fl-desc3 {
  height: 12px;
  width: 30%;
  margin-bottom: 20px;
}
</style>

<script>
import VideoCard from "./VideoCard.ts";
export default VideoCard;
</script>
