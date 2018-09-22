<template>
  <div>
    <v-responsive 
      v-if="!isPlayerReady"
      :aspect-ratio="16/9"
      class="fake-yt-player">
      <FloatingDiv class="title"/>
      <FloatingDiv class="button1"/>
      <FloatingDiv class="button2"/>
      <FloatingDiv class="bar"/>
    </v-responsive>
    <div 
      class="yt-player-iframe-wrapper" 
      v-show="isPlayerReady">
      <div :id="elementToAttach"/>
    </div>
  </div>
</template>

<style>
.yt-player-iframe-wrapper {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  width: 100%;
  overflow: hidden;
  max-width: 100%;
}

.yt-player-iframe-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>


<style scoped>
.fake-yt-player {
  position: relative;
}

.title {
  height: 5%;
  width: 60%;
  position: absolute;
  top: 5%;
  left: 5%;
}

.button2 {
  height: 5%;
  width: 5%;
  position: absolute;
  top: 5%;
  right: 5%;
}

.button1 {
  height: 5%;
  width: 5%;
  position: absolute;
  top: 5%;
  right: 15%;
}

.bar {
  height: 3%;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>


<script>
import YoutubePlayer from "./YoutubePlayer.ts";
export default YoutubePlayer;
</script>
