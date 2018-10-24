<template>
  <v-container 
    :key="category"
    fluid 
    grid-list-lg>
    <Helmet 
      :title="metaTitle" 
      :description="metaDescription"/>
    <IconHeading 
      :icon="categoryIcon" 
      :text="$t(categoryLabelKey)" />
    <InfiniteVideoList 
      :reset-onable="resetDeferredObservable.onable"
      :list-fetcher="trendingVideoFetcher"/>
  </v-container>
</template>

<style scoped>
</style>

<script>
import Trending from "./Trending.ts";
export default Trending;
</script>
