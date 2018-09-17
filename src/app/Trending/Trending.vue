<template>
  <v-layout
    id="trending" 
    row 
    wrap>
    <v-flex 
      xs6 
      md3
      lg2
      :key="$index"
      v-for="(video, $index) in videos">
      <VideoTile 
        :video="video"/>
    </v-flex>
    <ScrollFire 
      :have-more="haveMore" 
      @fire="getVideos"/>
  </v-layout>
</template>

<style scoped>
</style>

<script>
import Trending from "./Trending.ts";
export default Trending;
</script>
