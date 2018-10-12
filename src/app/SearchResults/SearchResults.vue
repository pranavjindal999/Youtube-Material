<template>
  <v-container 
    fluid 
    grid-list-lg>
    <InfiniteVideoList 
      :reset-onable="resetDeferredObservable.onable"
      :list-fetcher="searchResultsFetcher"/>
  </v-container>
</template>

<style scoped>
</style>

<script>
import SearchResults from "./SearchResults.ts";
export default SearchResults;
</script>
