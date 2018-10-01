<template>
  <VSlideYReverseTransition>
    <div 
      @click="$emit('click')"
      class="bar elevation-12 cur-p"
      v-show="active">
      <div 
        v-if="$vuetify.breakpoint.smAndDown" 
        :style="thumnailBgStyle" 
        class="bar-image-bg"/>
      <v-layout row>
        <v-layout row>
          <img 
            v-if="$vuetify.breakpoint.mdAndUp"
            class="thumb"
            :src="videoThumbnail">  
          <div class="mt-2 ml-2">
            <p 
              :class="barTitleClass" 
              class="font-weight-light">{{ title }}</p>
            <p 
              class="captionGrey--text mb-0" 
              :class="barTimerClass">{{ timeElapsed }} / {{ duration }}</p>
          </div>
        </v-layout>

        <div>
          <v-layout 
            row 
            class="btn-adj"
            align-center>
            <v-btn 
              slot="activator"
              fab 
              small
              :color="isLooping?'primary':''"
              @click.stop="toogleLoop">
              <v-icon>repeat_one</v-icon>
            </v-btn>
            <v-btn 
              slot="activator"
              fab 
              large
              color="youtubeRed"
              dark
              @click.stop="playPause">
              <v-icon>{{ isPlaying?'pause':'play_arrow' }}</v-icon>
            </v-btn>
            <v-btn 
              slot="activator"
              fab 
              small
              @click.stop="close">
              <v-icon>clear</v-icon>
            </v-btn>
          </v-layout>
        </div>
        
      </v-layout> 
      
      <v-progress-linear 
        class="progress"
        :value="elapsedPercent"
        :buffer-value="bufferPercent"
        buffer 
        :height="5"
        color="youtubeRed"/>
    </div>
  </VSlideYReverseTransition>
</template>

<style scoped>
.bar {
  position: fixed;
  bottom: 0;
  z-index: 3;
  left: 0;
  width: 100%;
  background: white;
  overflow: hidden;
}
.bar .progress {
  position: absolute;
  bottom: 0;
  width: 100%;
  margin: 0;
}
.thumb {
  max-height: 80px;
  display: inline;
}
.btn-adj {
  position: relative;
  top: -3px;
}
.mobile-bar-title {
  max-height: 44px;
  overflow: hidden;
  font-size: 15px;
  font-weight: 400 !important;
  color: black;
  text-shadow: 1px 1px 4px white;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.mobile-bar-duration {
  color: black !important;
  text-shadow: 1px 1px 4px white;
}

.bar-image-bg {
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: -1;
  overflow: hidden;
  filter: blur(8px) opacity(0.8);
}
</style>

<script>
import VideoBar from "./VideoBar.ts";
export default VideoBar;
</script>
