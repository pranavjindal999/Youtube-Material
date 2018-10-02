<template>
  <div>
    <v-card>
      <YoutubePlayer :video-id="videoId"/>
      <template v-if="video">
        <v-card-title primary-title>
          <v-layout 
            class="pa-0 ma-0" 
            row 
            wrap>
            <v-flex 
              xs12
              class="title font-weight-regular mb-0 pa-0"> {{ title }}</v-flex>
            <v-flex 
              class="pa-0 mt-2 body-1 success--text"> {{ uploaded }} </v-flex>
            <span class="pa-0 mt-2 body-1 primary--text"> {{ views }}</span>
          </v-layout>
        </v-card-title>
       
        <v-divider/>

        <v-card-text>
          <v-layout 
            class="pa-0 ma-0" 
            row 
            justify-space-between>
            <v-flex class="pa-0">
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
            <div>
              <v-layout 
                class="pa-0 ma-0"
                row 
                wrap 
                justify-space-between>
                <div 
                  class="pa-0 mr-4">
                  <v-icon 
                    small 
                    color="success">thumb_up</v-icon>
                  <span 
                    :title="(+likeCount).toLocaleString()" 
                    class="pl-1">{{ humanizedLikeCount }}</span>
                </div>
                <div 
                  class="pa-0">
                  <v-icon 
                    small 
                    color="error">thumb_down</v-icon>
                  <span 
                    :title="(+dislikeCount).toLocaleString()" 
                    class="pl-1">{{ humanizedDislikeCount }}</span>
                </div>
                <v-flex 
                  class="pa-0" 
                  xs12> 
                  <v-progress-linear
                    background-color="error"
                    color="success"
                    height="3"
                    :value="likePercent"/>
                </v-flex>
              </v-layout>
            </div>
          </v-layout>
        </v-card-text>

        <v-divider/>

        <v-card-text>
          <v-responsive 
            :max-height="isDescriptionExpanded?'':80">
            <div 
              class="pre-wrap"
              v-async-bind="desciption"/>
          </v-responsive>

          <v-layout 
            justify-center>
            <v-btn 
              ref="expandCollapseBtn"
              icon 
              @click="expandeCollapseDesc"  
              small>
              <v-icon dark>{{ isDescriptionExpanded?'expand_less':'expand_more' }}</v-icon>
            </v-btn>
          </v-layout>
        </v-card-text>
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
          <FloatingDiv class="fl-divider" />
          <FloatingDiv class="fl-desc1" />
          <FloatingDiv class="fl-desc2" />
          <FloatingDiv class="fl-desc3" />
        </div>
      </template>

    </v-card>
  </div>
        
</template>

<style scoped>
.title {
  font-size: 18px;
}
.channel-chip {
  text-decoration: none;
  font-size: 16px !important;
  margin-left: -8px;
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
