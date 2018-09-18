<template>
  <InfiniteVideoList 
    :reset-onable="resetDeferredObservable.onable"
    :video-fetcher="getSearchResults"/>
</template>

<style scoped>
</style>

<script>
import SearchResults from "./SearchResults.ts";
export default SearchResults;
</script>
