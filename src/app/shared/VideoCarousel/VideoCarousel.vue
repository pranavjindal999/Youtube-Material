<template>
  <div class="carousel">
    <v-btn 
      @click="previous" 
      class="previous" 
      v-show="prevPageToken"
      fab 
      small 
      color="white">
      <v-icon dark>navigate_before</v-icon>
    </v-btn>
    <v-layout 
      class="mx-2"
      row 
      align-center
      v-touch="{left: next, right: previous}">
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
    </v-layout>
    <v-btn 
      @click="next" 
      class="next" 
      v-show="nextPageToken"
      fab 
      small 
      color="white">
      <v-icon dark>navigate_next</v-icon>
    </v-btn>
  </div>
</template>

<style scoped>
.carousel {
  position: relative;
}
.previous {
  position: absolute;
  height: 80px;
  border-radius: 4px;
  width: 20px;
  left: -18px;
  top: 25%;
}

.next {
  position: absolute;
  height: 80px;
  border-radius: 4px;
  width: 20px;
  right: -18px;
  top: 25%;
}
</style>

<script>
import VideoCarousel from "./VideoCarousel.ts";
export default VideoCarousel;
</script>
