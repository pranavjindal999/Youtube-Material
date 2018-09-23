<template>
  <div 
    v-show="videoId">

    <VideoBar 
      @click="goToVideo" 
      :value="!!(barMode && videoId)"
      @close="cleanVideoState"
      app
      :video="video"
      :force-updater="forceUpdater"/>
   
    <transition 
      appear
      @before-enter="beforeVideoPageOpen" 
      @after-leave="afterVideoPageClose" 
      name="video-page">
      <div 
        :class="videoPageClass" 
        v-show="!barMode">
        <VideoPage 
          :video="video" 
          :video-id="videoId"/>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.iframe-hide-hack {
  position: fixed;
  opacity: 0;
  z-index: -1;
  display: initial !important;
}
</style>


<style>
.video-page-enter-active,
.video-page-leave-active {
  transition: all 0.3s;
}
.video-page-enter,
.video-page-leave-to {
  opacity: 0;
  transform: translateY(10%);
}
</style>


<script>
import VideoWrapper from "./VideoWrapper.ts";
export default VideoWrapper;
</script>
