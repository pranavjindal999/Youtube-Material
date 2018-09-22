<template>
  <v-container 
    fluid 
    grid-list-lg>
    <InfiniteVideoList 
      hide-channel-link 
      :reset-onable="resetDeferred.onable"
      :list-fetcher="channelVideosFetcher"/>
  </v-container>
</template>

<style scoped>
</style>

<script>
import ChannelVideos from "./ChannelVideos.ts";
export default ChannelVideos;
</script>
