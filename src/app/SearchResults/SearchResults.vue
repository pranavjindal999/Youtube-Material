<template>
  <div>
    <Helmet 
      :title="metaTitle" 
      :description="metaDescription"/>
    <v-container 
      fluid 
      grid-list-lg>
      <IconHeading 
        icon="search" 
        :text="$t('searchResultsFor', {query: query})" />
      

      <InfiniteVideoList 
        :reset-onable="resetDeferredObservable.onable"
        :list-fetcher="searchResultsFetcher"/>
    </v-container>
  </div>
</template>

<style scoped>
</style>

<script>
import SearchResults from "./SearchResults.ts";
export default SearchResults;
</script>
