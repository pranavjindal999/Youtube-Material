<template>
  <v-layout 
    v-if="text" 
    justify-center>
    <v-icon class="mr-2">error</v-icon>
    <span class="title">{{ text }}</span>
  </v-layout>
</template>

<style scoped>
</style>

<script>
import ErrorMessage from "./ErrorMessage.ts";
export default ErrorMessage;
</script>
