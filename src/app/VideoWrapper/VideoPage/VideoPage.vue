<template>
  <div>
    <v-container 
      fluid 
      grid-list-lg>
      <v-layout 
        row 
        wrap>
        <v-flex 
          xs12 
          md8>
          <div :class="isMobile?'video-mobile-margins':''">
            <VideoCard  
              :video-id="videoId" 
              :video="video"/>
                    
            <InfiniteCommentsList 
              :manual="isMobile"
              v-if="videoId"
              class="mt-3"
              :video-id="videoId" 
              :list-fetcher="videoCommentsFetcher" 
              :reset-onable="resetDeferredComments.onable">
              <v-layout 
                slot="top" 
                class="ma-0 mb-2" 
                row 
                justify-center>
                <v-btn-toggle 
                  mandatory
                  class="elevation-0 width100" 
                  v-model="commentThreadOrder">
                  <v-btn 
                    color="primary" 
                    flat 
                    block
                    :value="CommentThreadOrderEnum.RELEVANCE">
                    <v-icon class="mr-2">thumb_up</v-icon>
                    <span>{{ $t('topComments') }}</span>
                  </v-btn>
                  <v-btn 
                    color="primary" 
                    flat 
                    block
                    :value="CommentThreadOrderEnum.TIME">
                    <v-icon class="mr-2">access_time</v-icon>
                    <span>{{ $t('recentComments') }}</span>
                  </v-btn>
                </v-btn-toggle>
              </v-layout>
            </InfiniteCommentsList>
          </div>
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
.width100 {
  width: 100%;
}
.video-mobile-margins {
  margin: -16px !important;
  margin-bottom: 16px !important;
}
</style>

<script>
import VideoPage from "./VideoPage.ts";
export default VideoPage;
</script>
