<template>
  <div 
    :class="{height: haveMore}"
    ref="el">
    <!-- <v-btn 
      v-if="haveMore" 
      @click="$emit('fire')">Load More</v-btn> -->
  </div>
</template>

<style scoped>
.height {
  height: 300px;
}
</style>


<script>
import ScrollFire from "./ScrollFire.ts";
export default ScrollFire;
</script>
