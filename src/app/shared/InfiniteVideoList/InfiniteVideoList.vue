<template>
  <v-layout
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
      @fire="onScrollFire"/>
  </v-layout>
</template>

<style scoped>
</style>

<script>
import InfiniteVideoList from "./InfiniteVideoList.ts";
export default InfiniteVideoList;
</script>
