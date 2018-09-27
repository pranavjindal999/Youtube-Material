<template>
  <v-layout
    row 
    wrap>
    <template 
      v-if="list.length">
      <v-flex 
        v-bind="layoutProps"
        :key="$index"
        v-for="(video, $index) in list">
        <VideoTile
          :hide-channel-link="hideChannelLink"
          :video="video"/>
      </v-flex>
    </template>
    <v-responsive 
      v-else 
      :aspect-ratio="6">
      <ErrorMessage :text="$t(noVideoText)"/>
    </v-responsive>
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
