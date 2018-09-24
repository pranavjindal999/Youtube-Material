<template>
  <div>
    <template v-if="isMobile">
      <VideoCard  
        :video-id="videoId" 
        :video="video"/>
      <VideoComments/>
    </template>
    <v-container 
      fluid 
      grid-list-lg>
      <v-layout 
        row 
        wrap>
        <v-flex 
          xs12 
          md8>
          <template v-if="!isMobile">
            <VideoCard  
              :video-id="videoId" 
              :video="video"/>
            <VideoComments/>
          </template>
        </v-flex>
        <v-flex 
          xs12 
          md4>
          <InfiniteVideoList 
            v-if="videoId"
            :reset-onable="resetDeferred.onable"
            :list-fetcher="relatedVideosFetcher" 
            two-column/>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<style scoped>
</style>

<script>
import VideoPage from "./VideoPage.ts";
export default VideoPage;
</script>
