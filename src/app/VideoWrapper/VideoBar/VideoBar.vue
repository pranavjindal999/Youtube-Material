<template>
  <VSlideYReverseTransition>
    <div 
      @click="$emit('click')"
      class="bar elevation-12 cur-p"
      v-show="active">
      <v-layout row>
        <v-layout row>
          <img 
            class="thumb pr-2"
            :src="videoThumbnail">  
          <div class="mt-2 text-truncate">
            <p 
              :class="barTitleClass" 
              class="font-weight-light">{{ title }}</p>
            <p 
              class="captionGrey--text" 
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
           
            <v-tooltip bottom>
              <v-btn 
                slot="activator"
                fab 
                large
                color="youtubeRed"
                dark
                @click.stop="playPause">
                <v-icon>{{ isPlaying?'pause':'play_arrow' }}</v-icon>
              </v-btn>
              <span>{{ isPlaying?$t('pause'):$t('play') }}</span>
            </v-tooltip>
            
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
</style>

<script>
import VideoBar from "./VideoBar.ts";
export default VideoBar;
</script>
