<template>
  <v-layout
    row 
    wrap>
    <v-flex 
      v-bind="layoutProps"
      :key="$index"
      v-for="(video, $index) in list">
      <VideoTile
        :hide-channel-link="hideChannelLink"
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
