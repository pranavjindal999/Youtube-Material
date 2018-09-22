<template>
  <v-layout
    row 
    wrap>
    <v-flex 
      xs6 
      md3
      lg2
      :key="$index"
      v-for="(channel, $index) in list">
      <ChannelTile 
        :channel="channel"/>
    </v-flex>
    <ScrollFire 
      :have-more="haveMore" 
      @fire="onScrollFire"/>
  </v-layout>
</template>

<style scoped>
</style>

<script>
import InfiniteChannelList from "./InfiniteChannelList.ts";
export default InfiniteChannelList;
</script>
