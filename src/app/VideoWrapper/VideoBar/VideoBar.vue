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
              :class="barTitleClass">{{ title }}</p>
            <p 
              class="captionGrey--text mb-0" 
              :class="barTimerClass">{{ timeElapsed }} / {{ duration }}</p>
          </div>
        </v-layout>

        <div @click.stop>
          <v-layout 
            row 
            class="btn-adj"
            align-center>
            <v-btn 
              fab 
              small
              :color="isLooping?'primary':''"
              @click="toogleLoop">
              <v-icon>repeat_one</v-icon>
            </v-btn>
            <v-btn 
              fab 
              large
              color="vTyoobRed"
              :loading="isBuffering"
              :class="isBuffering?'force-pointer-events':''"
              dark
              @click="playPause">
              <v-icon>{{ isPlaying?'pause':'play_arrow' }}</v-icon>
              <span slot="loader">
                <v-progress-circular 
                  indeterminate 
                  size="72" 
                  :width="3" 
                  color="white">
                  <v-icon >{{ isPlaying?'pause':'play_arrow' }}</v-icon>
                </v-progress-circular>
              </span>
            </v-btn>
            <v-btn 
              fab 
              small
              @click="close">
              <v-icon>stop</v-icon>
            </v-btn>
          </v-layout>
        </div>
        
      </v-layout> 
      
      <v-progress-linear 
        @click.native.stop
        class="progress"
        :value="elapsedPercent"
        :buffer-value="bufferPercent"
        buffer 
        :height="4"
        color="vTyoobRed"/>
      <v-slider
        class="seeker seekable" 
        @click.native.stop
        :value="elapsedPercent"
        @change="seekVideo"
        :height="4"
        thumb-label
        color="transparent"
        track-color="transparent"
        always-dirty
        thumb-color="vTyoobRed">
        <template
          slot="thumb-label"
          slot-scope="props">
          <span>
            {{ getSeekToTime(props.value) }}
          </span>
        </template>
      </v-slider>
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
}
.bar .progress {
  position: absolute;
  bottom: 0;
  width: 100%;
  margin: 0;
  background: black;
  opacity: 0.4;
}
.bar .seeker {
  position: absolute;
  bottom: 0;
  width: 100%;
  margin: 0;
  margin-bottom: -20px;
  z-index: 1;
}
.force-pointer-events {
  pointer-events: all !important;
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
  color: white;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  font-weight: 500 !important;
}
.mobile-bar-duration {
  color: white !important;
}

.bar-image-bg {
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: -1;
}
</style>

<style>
.seekable,
.seekable * {
  cursor: col-resize !important;
}
</style>


<script>
import VideoBar from "./VideoBar.ts";
export default VideoBar;
</script>
