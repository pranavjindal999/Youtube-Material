<template>
  <v-container 
    fluid 
    grid-list-lg>
    <v-layout 
      class="mb-3" 
      row>
      <v-icon class="mr-3">restore</v-icon>
      <h2 class="font-weight-regular">Recently uploaded</h2>
    </v-layout>
    <VideoCarousel 
      hide-channel-link 
      :video-fetcher="getRecentVideos"/>


    <v-divider class="my-4"/>

    <v-layout 
      class="mb-3" 
      row>
      <v-icon class="mr-3">trending_up</v-icon>
      <h2 class="font-weight-regular">Most Popular</h2>
    </v-layout>
    <VideoCarousel 
      hide-channel-link 
      :video-fetcher="getPopularVideos"/>
  </v-container>
</template>

<style scoped>
</style>

<script>
import ChannelHome from "./ChannelHome.ts";
export default ChannelHome;
</script>
