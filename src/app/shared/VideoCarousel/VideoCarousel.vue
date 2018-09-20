<template>
  <v-layout 
    row 
    align-center
    v-touch="{
      left: next,
      right: previous
  }">
    <v-btn 
      @click="previous" 
      fab 
      small 
      color="white">
      <v-icon dark>navigate_before</v-icon>
    </v-btn>

    <v-flex 
      xs6 
      md3
      lg2 
      :key="$index"
      v-for="(video, $index) in videos">
      <VideoTile 
        :hide-channel-link="hideChannelLink"
        :video="video"/>
    </v-flex>
    <v-btn 
      @click="next" 
      fab 
      small 
      color="white">
      <v-icon dark>navigate_next</v-icon>
    </v-btn>

  </v-layout>
</template>

<style scoped>
.previous {
}

.next {
}
</style>

<script>
import VideoCarousel from "./VideoCarousel.ts";
export default VideoCarousel;
</script>
