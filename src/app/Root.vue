<template>
  <v-app 
    v-resize="onResize"
    id="ytmat">
    <Header/>
    <Navigation/>
    <v-content id="main-content">
      <router-view />
      <VideoBar/>
    </v-content>
  </v-app>
</template>

<script>
import Root from "./Root.ts";
export default Root;
</script>
