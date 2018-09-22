<template>
  <v-container 
    fluid 
    grid-list-lg>
  

    <IconHeading 
      icon="restore" 
      text="Recently uploaded" />

    <VideoCarousel 
      hide-channel-link 
      :reset-onable="resetDeferred.onable"
      :video-fetcher="getRecentVideos"/>


    <v-divider class="my-4"/>

    <IconHeading 
      icon="trending_up" 
      text="Most Popular" />


  
    <VideoCarousel 
      hide-channel-link 
      :reset-onable="resetDeferred.onable"
      :video-fetcher="getPopularVideos"/>
  </v-container>
</template>

<style scoped>
</style>

<script>
import ChannelHome from "./ChannelHome.ts";
export default ChannelHome;
</script>
