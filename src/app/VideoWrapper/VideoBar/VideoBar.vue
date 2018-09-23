<template>
  <VSlideYReverseTransition>
    <v-responsive 
      aspect-ratio="15" 
      class="bar elevation-12 cur-p"
      v-show="value">
      <v-layout 
        justify-space-between
        row>
        <v-flex class="pa-0">
          <v-layout justify-start>
            <img 
              class="thumb pr-2"
              :src="videoThumbnail">  
            <v-flex class="mt-2">
              <p 
                :class="barTitleClass" 
                class="text-truncate font-weight-light">{{ title }}</p>
              <p 
                class="captionGrey--text" 
                :class="barTimerClass">{{ timeElapsed }} / {{ duration }}</p>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex 
          xs0 
          d-inline-flex>
          <v-layout 
            d-inline-flex
            justify-end
            row 
            align-center>
            <v-tooltip bottom>
              <v-btn 
                slot="activator"
                fab 
                small
                :color="isLooping?'primary':''"
                @click.stop="toogleLoop">
                <v-icon>repeat_one</v-icon>
              </v-btn>
              <span>{{ $t('repeat') }}</span>
            </v-tooltip>
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
            <v-tooltip bottom>
              <v-btn 
                slot="activator"
                fab 
                small
                @click.stop="close">
                <v-icon>clear</v-icon>
              </v-btn>
              <span>{{ $t('stop') }}</span>
            </v-tooltip>
          </v-layout>
        </v-flex>
      </v-layout> 
      
      <v-progress-linear 
        class="progress"
        :value="elapsedPercent"
        :buffer-value="bufferPercent"
        buffer 
        :height="6"
        color="youtubeRed"/>
    </v-responsive>
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
  max-height: 90px;
  display: inline;
}
</style>

<script>
import VideoBar from "./VideoBar.ts";
export default VideoBar;
</script>
