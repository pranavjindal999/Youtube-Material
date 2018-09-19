<template>
  <v-app 
    v-resize="onResize"
    id="ytmat">
    <Header/>
    <Navigation/>
    <v-content >
      <v-container 
        id="main-content"
        fluid 
        grid-list-lg>
        <router-view />
        <VideoBar/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Root from "./Root.ts";
export default Root;
</script>
