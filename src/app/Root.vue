<template>
  <v-app 
    v-resize="onResize"
    id="ytmat">
    <Header/>
    <Navigation/>
    <v-content id="main-content">
      <VideoWrapper/>
      <transition 
        name="router" 
        mode="out-in">
        <router-view />
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import Root from "./Root.ts";
export default Root;
</script>
