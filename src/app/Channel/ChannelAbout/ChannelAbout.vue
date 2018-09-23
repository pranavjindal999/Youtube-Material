<template>
  <v-container 
    fluid 
    grid-list-lg>
    <v-card v-if="channel">
      <v-card-title primary-title>
        <div>
          <div class="headline">{{ channelName }}</div>
        </div>
      </v-card-title>
      <v-card-text 
        class="subheading font-weight-regular pre-line" 
        v-async-bind="channelDesc"/>
      <v-divider light/>
      <v-card-actions class="pa-3 lightGrey">
        <v-layout 
          row 
          wrap 
          justify-center>
          <v-flex 
            class="channel-info-label"
            xs12 
            md6 
            lg3
            :key="$index" 
            v-for="(item, $index) in channelInfoItems">
            <v-icon>{{ item.icon }}</v-icon>
            <div class="d-inline-block">
              <span 
                class="ml-2 font-weight-medium">{{ $t(item.labelKey) }}: </span>
              <span>{{ item.value }}</span>
            </div>
          </v-flex>
        </v-layout>
      </v-card-actions>
    </v-card>
    <v-responsive 
      v-else
      :aspect-ratio="8">
      <FloatingDiv class="fl-title"/>
      <FloatingDiv class="fl-desc1"/>
      <FloatingDiv class="fl-desc2"/>
      <FloatingDiv class="fl-sub"/>
    </v-responsive>

  </v-container>
</template>

<style scoped>
.channel-info-label {
  line-height: 26px;
  display: flex;
  justify-content: flex-start;
}

.fl-title {
  height: 15%;
  margin-bottom: 2%;
  width: 20%;
}

.fl-desc1 {
  height: 10%;
  margin-bottom: 2%;
  width: 70%;
}

.fl-desc2 {
  height: 10%;
  margin-bottom: 2%;
  width: 30%;
}

.fl-sub {
  height: 10%;
  width: 50%;
}
</style>

<script>
import ChannelAbout from "./ChannelAbout.ts";
export default ChannelAbout;
</script>
