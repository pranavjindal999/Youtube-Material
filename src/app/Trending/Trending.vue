<template>
  <v-container 
    :key="category"
    fluid 
    grid-list-lg>
    <v-layout 
      class="mb-3" 
      row>
      <v-icon class="mr-3">{{ categoryIcon }}</v-icon>
      <h2 class="font-weight-regular">{{ $t(categoryLabelKey) }}</h2>
    </v-layout>
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
