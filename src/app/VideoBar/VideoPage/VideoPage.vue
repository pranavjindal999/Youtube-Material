<template>
  <v-container 
    fluid 
    grid-list-lg>
    <YoutubePlayer 
      :video-id="videoId"/>
  </v-container>
</template>

<style scoped>
</style>

<script>
import VideoPage from "./VideoPage.ts";
export default VideoPage;
</script>
