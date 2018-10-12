<template>
  <v-layout 
    v-if="text" 
    fill-height
    align-center
    justify-center>
    <v-icon 
      small 
      class="mr-2">error</v-icon>
    <span class="subheading">{{ text }}</span>
  </v-layout>
</template>

<style scoped>
</style>

<script>
import ErrorMessage from "./ErrorMessage.ts";
export default ErrorMessage;
</script>
