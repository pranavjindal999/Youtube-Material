<template>
  <div class="carousel">
    <v-btn 
      @click="sendNextPrevGA('prev');previous()" 
      class="previous" 
      :disabled="isCurrentRequestPending"
      v-show="prevPageToken"
      fab 
      small 
      color="white">
      <v-icon dark>navigate_before</v-icon>
    </v-btn>
    <v-layout 
      v-swipable="swipableOptions"
      @swipe-left="next"
      @swipe-right="previous"
      v-if="videos.length"
      class="mx-2"
      row 
      align-center 
      wrap>
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
    <v-responsive 
      v-else 
      :aspect-ratio="noDataAspectRatio">
      <ErrorMessage :text="$t(noVideoText)"/>
    </v-responsive>
    <v-btn 
      @click="sendNextPrevGA('next');next()" 
      class="next" 
      :disabled="isCurrentRequestPending"
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
  z-index: 1;
}

.next {
  position: absolute;
  height: 80px;
  border-radius: 4px;
  width: 20px;
  right: -18px;
  top: 25%;
  z-index: 1;
}
</style>

<script>
import VideoCarousel from "./VideoCarousel.ts";
export default VideoCarousel;
</script>
