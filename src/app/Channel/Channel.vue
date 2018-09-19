<template>
  <div>
    <v-img 
      :src="coverUrl" 
      :aspect-ratio="1060/175">
      <FloatingDiv 
        slot="placeholder"/>
    </v-img>
    <v-toolbar
      dark
      color="youtubeRed"
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
        color="youtubeRed" 
        slider-color="white">
        <v-tab
          v-for="tab in tabs"
          :key="tab.labelKey"
          :to="tab.route">
          <v-icon class="icon">{{ tab.icon }}</v-icon>
          {{ $t(tab.labelKey) }}
        </v-tab> 
      </v-tabs>
    </v-toolbar>
    <router-view/>
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
</style>

<script>
import Channel from "./Channel.ts";
export default Channel;
</script>
