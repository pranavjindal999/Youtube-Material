<template>
  <v-layout 
    row 
    wrap>
    <v-flex 
      xs6 
      md3
      lg2
      :key="$index"
      v-for="(video, $index) in videos">
      <VideoTile 
        :video="video"/>
    </v-flex>
  </v-layout>
</template>

<style scoped>
</style>

<script>
import SearchResults from "./SearchResults.ts";
export default SearchResults;
</script>
