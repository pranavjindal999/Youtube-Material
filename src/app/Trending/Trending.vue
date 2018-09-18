<template>
  <InfiniteVideoList 
    :reset-onable="resetDeferredObservable.onable"
    :video-fetcher="getTrendingVideos"/>
</template>

<style scoped>
</style>

<script>
import Trending from "./Trending.ts";
export default Trending;
</script>
