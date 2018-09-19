<template>
  <v-container 
    fluid 
    grid-list-lg>
    <InfiniteVideoList 
      :reset-onable="resetDeferredObservable.onable"
      :video-fetcher="getTrendingVideos"/>
  </v-container>
</template>

<style scoped>
</style>

<script>
import Trending from "./Trending.ts";
export default Trending;
</script>
