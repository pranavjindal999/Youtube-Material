<template>
  <div v-show="videoId">
    <v-bottom-nav 
      height="74"
      :value="!!(barMode && videoId)"
      color="white"
      :app="!!(barMode && videoId)"
      fixed>
      <!-- <v-layout 
        row 
        class="bar">
        <v-flex>
          <v-img 
            class="thumb" 
            :aspect-ratio="1"
            :src="videoThumbnal"/>  
          <div>
            <p class="title">{{ title }}</p>
            <p class="timer">{{ timeElapsed }} / {{ duration }}</p>
          </div>
        </v-flex>
        <v-progress-linear 
          class="progress"
          v-model="elapsedPercent"
          :buffer-value="bufferPercent"
          buffer 
          :height="5"
          color="youtubeRed"/>
      </v-layout> -->
      
    </v-bottom-nav>
    <transition name="fade">
      <div v-show="!barMode">
        <VideoPage 
          :video="video" 
          :video-id="videoId"/>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.bar {
  position: relative;
  padding-bottom: 5px;
}
.bar .progress {
  position: absolute;
  bottom: 0;
  width: 100%;
  margin: 0;
}

.bar .title {
  font-size: 16px;
}
</style>


<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(50%);
}
</style>


<script>
import VideoBar from "./VideoBar.ts";
export default VideoBar;
</script>
