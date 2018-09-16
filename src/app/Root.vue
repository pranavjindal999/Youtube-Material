<template>
  <v-app 
    id="ytmat">
    <Header/>
    <Navigation/>
    <v-content >
      <v-container 
        fluid 
        grid-list-lg>
        <router-view id="main-content"/>
      </v-container>
    </v-content>
    <VideoBar/>
  </v-app>
</template>

<script>
import Root from "./Root.ts";
export default Root;
</script>
