<template>
  <v-container 
    fluid 
    grid-list-lg>
    <IconHeading 
      icon="movie_filter" 
      :text="$t(featuredChannelsTitle)" />
    <v-layout
      v-if="featuredChannels.length"
      row 
      wrap>
      <v-flex 
        xs6 
        md3
        lg2
        :key="$index"
        v-for="(channel, $index) in featuredChannels">
        <ChannelTile :channel="channel"/>
      </v-flex>
    </v-layout>
    <v-responsive 
      v-else 
      :aspect-ratio="7">
      <ErrorMessage :text="$t(noFeaturedError)"/>
    </v-responsive>


    <div 
      v-show="isSubsVisible"
      v-if="canSeeSubs">
      <v-divider class="my-4"/>
      <IconHeading 
        icon="subscriptions" 
        :text="$t('subscriptions')" />
      <InfiniteChannelList 
        no-channel-text="noChannelsSubscribed"
        :list-fetcher="subscriptionFetcher"/>
    </div>
  </v-container>
</template>

<style scoped>
</style>

<script>
import ChannelChannels from "./ChannelChannels.ts";
export default ChannelChannels;
</script>
