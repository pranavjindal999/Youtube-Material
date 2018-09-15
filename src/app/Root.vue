<template>
  <v-app id="ytmat">
    <Header/>
    <Navigation/>
    <v-content >
      <v-container fill-height>
        <router-view id="main-content"/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Root from "./Root.ts";
export default Root;
</script>
