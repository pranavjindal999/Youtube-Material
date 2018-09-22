<template>
  <v-hover v-if="channel">
    <v-card 
      :to="channelRoute"
      class="channel-tile"
      slot-scope="{ hover }"
      :class="`elevation-${hover ? 6 : 1}`">
      <v-img
        :src="thumbnail"
        :aspect-ratio="1">
        <FloatingDiv 
          slot="placeholder"/>
      </v-img>
      
      <v-card-title 
        class="px-2 pt-2 pb-0" 
        primary-title>
        <h3 class="text-truncate lh2 font-weight-light mb-2 title">{{ title }}</h3>
      </v-card-title>
    </v-card>
  </v-hover>
  <v-responsive 
    v-else
    :aspect-ratio=".68">
    <FloatingDiv class="fl-img"/>
    <FloatingDiv class="fl-title"/>
    <FloatingDiv class="fl-title1"/>
  </v-responsive>
</template>

<style scoped>
.lh2 {
  line-height: 2 !important;
}

.fl-img {
  height: 70%;
  margin-bottom: 5%;
}

.fl-title {
  height: 6%;
  width: 65%;
  margin-bottom: 5%;
}
.fl-title1 {
  height: 6%;
  width: 40%;
}
</style>

<script>
import ChannelTile from "./ChannelTile.ts";
export default ChannelTile;
</script>
