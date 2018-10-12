<template>
  <v-container 
    fluid 
    grid-list-lg>
    <InfiniteVideoList 
      hide-channel-link 
      :list-fetcher="channelVideosFetcher"/>
  </v-container>
</template>

<style scoped>
</style>

<script>
import ChannelVideos from "./ChannelVideos.ts";
export default ChannelVideos;
</script>
