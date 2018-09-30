<template>
  <v-layout
    row 
    wrap>
    <template v-if="list.length">
      <v-flex 
        xs6 
        md3
        lg2
        :key="$index"
        v-for="(channel, $index) in list">
        <ChannelTile 
          :channel="channel"/>
      </v-flex>
    </template>
    <v-responsive 
      v-else 
      :aspect-ratio="6">
      <ErrorMessage :text="$t(noChannelText)"/>
    </v-responsive>
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
