<template>
  <div>
    <template v-if="isMobile">
      <VideoCard  
        :video-id="videoId" 
        :video="video"/>
      <InfiniteCommentsList 
        manual
        v-if="videoId"
        class="mt-3"
        :video-id="videoId" 
        :list-fetcher="videoCommentsFetcher" 
        :reset-onable="resetDeferredComments.onable">
        <v-layout 
          slot="top" 
          class="ma-0 pt-2" 
          row 
          justify-center>
          <v-btn-toggle v-model="commentThreadOrder">
            <v-btn 
              flat 
              :value="CommentThreadOrderEnum.RELEVANCE">
              <v-icon class="mr-2">thumb_up</v-icon>
              <span>{{ $t('topComments') }}</span>
            </v-btn>
            <v-btn 
              flat 
              :value="CommentThreadOrderEnum.TIME">
              <v-icon class="mr-2">access_time</v-icon>
              <span>{{ $t('recentComments') }}</span>
            </v-btn>
          </v-btn-toggle>
        </v-layout>
      </InfiniteCommentsList>
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
              
            <InfiniteCommentsList 
              v-if="videoId"
              class="mt-3"
              :video-id="videoId" 
              :list-fetcher="videoCommentsFetcher" 
              :reset-onable="resetDeferredComments.onable">
              <v-layout 
                slot="top" 
                class="ma-0 pt-2" 
                row 
                justify-center>
                <v-btn-toggle v-model="commentThreadOrder">
                  <v-btn 
                    color="primary" 
                    flat 
                    :value="CommentThreadOrderEnum.RELEVANCE">
                    <v-icon class="mr-2">thumb_up</v-icon>
                    <span>{{ $t('topComments') }}</span>
                  </v-btn>
                  <v-btn 
                    color="primary" 
                    flat 
                    :value="CommentThreadOrderEnum.TIME">
                    <v-icon class="mr-2">access_time</v-icon>
                    <span>{{ $t('recentComments') }}</span>
                  </v-btn>
                </v-btn-toggle>
              </v-layout>
            </InfiniteCommentsList>
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
