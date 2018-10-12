<template>
  <v-container 
    fluid 
    grid-list-lg>
    <div 
      :key="$index" 
      v-for="(category, $index) in categories">

      <IconHeading 
        :icon="category.icon" 
        :text="$t(category.labelKey)" />

      <VideoCarousel 
        :video-fetcher="getVidoListFetcher(category)"/>
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
