<template>
  <div>
    <div 
      v-if="!isPlayerReady" 
      class="fake-yt-player">
      <FloatingDiv class="title"/>
      <FloatingDiv class="button1"/>
      <FloatingDiv class="button2"/>
      <FloatingDiv class="bar"/>
    </div>
    <div v-show="isPlayerReady">
      <div :id="elementToAttach"/>
    </div>
  </div>
</template>

<style scoped>
.fake-yt-player {
  height: 390px;
  width: 640px;
  border: 2px solid #f6f7f8;
  position: relative;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
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
