<template>
  <div :class="{'scroll-fire-div': haveMore}"/>
</template>

<style scoped>
.scroll-fire-div {
  height: 100px;
  width: 100%;
}
</style>


<script>
import ScrollFire from "./ScrollFire.ts";
export default ScrollFire;
</script>
