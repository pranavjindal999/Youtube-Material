<template>
  <v-container 
    fluid 
    grid-list-lg>
    <div 
      :key="$index" 
      v-for="(category, $index) in categories">
      <v-layout 
        class="mb-3" 
        row>
        <v-icon class="mr-3">{{ category.icon }}</v-icon>
        <h2 class="font-weight-regular">{{ $t(category.labelKey) }}</h2>
      </v-layout>
      <VideoCarousel 
        :video-fetcher="getPopularVideos(category)"/>
      <v-divider 
        v-show="isNotLast($index)" 
        class="my-4"/>
    </div>
</v-container></template>

<style scoped>
</style>

<script>
import HomePage from "./HomePage.ts";
export default HomePage;
</script>
