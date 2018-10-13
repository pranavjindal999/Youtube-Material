<template>
  <div>
    <Helmet :title="channelTitle"/>
    <v-img 
      v-if="coverUrl"
      :src="coverUrl" 
      :aspect-ratio="coverAspect">
      <FloatingDiv 
        slot="placeholder"/>
    </v-img>
    <v-responsive 
      v-else 
      :aspect-ratio="coverAspect" />
    <v-toolbar
      ref="tabBar"
      dark
      color="vTyoobRed"
      :class="stickyTabsClass"
      tabs>
      <v-avatar 
        class="thumbnail elevation-6" 
        :size="100">
        <v-img 
          :src="thumbnail" 
          :aspect-ratio="1">
          <FloatingDiv 
            slot="placeholder"/>
        </v-img>
      </v-avatar>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-tabs 
        slot="extension" 
        color="vTyoobRed" 
        slider-color="white"
        grow>
        <v-tab
          v-for="tab in tabs"
          :key="tab.labelKey"
          :to="tab.route">
          <v-icon class="icon">{{ tab.icon }}</v-icon>
          <span v-if="isTabTitleVisible">{{ $t(tab.labelKey) }}</span>
        </v-tab> 
      </v-tabs>
    </v-toolbar>
    <transition 
      name="router" 
      mode="out-in">
      <router-view v-bind="{channel}"/>
    </transition>
  </div>
</template>

<style scoped>
.thumbnail {
  position: relative;
  top: -35px;
}

.icon {
  margin-right: 12px;
}

.sticky-tab {
  position: sticky;
  top: 16px;
  z-index: 1;
}
.sticky-mobile {
  position: sticky;
  top: 10px;
  z-index: 1;
}
.sticky-normal {
  position: sticky;
  top: 0;
  z-index: 1;
}
</style>

<script>
import Channel from "./Channel.ts";
export default Channel;
</script>
