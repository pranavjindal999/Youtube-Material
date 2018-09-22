<template>
  <v-container 
    fluid 
    grid-list-lg>
    <IconHeading 
      icon="movie_filter" 
      :text="$t(featuredChannelsTitle)" />
    <v-layout
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

    <ErrorMessage :text="$t(noFeaturedError)"/>

    <div 
      v-show="isSubsVisible"
      v-if="canSeeSubs">
      <v-divider class="my-4"/>
      <IconHeading 
        icon="subscriptions" 
        :text="$t('subscriptions')" />
      <InfiniteChannelList 
        :list-fetcher="subscriptionFetcher"
        :reset-onable="resetDeferred.onable"/>
    </div>
  </v-container>
</template>

<style scoped>
</style>

<script>
import ChannelChannels from "./ChannelChannels.ts";
export default ChannelChannels;
</script>
