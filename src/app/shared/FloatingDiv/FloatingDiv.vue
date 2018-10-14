<template>
  <div class="floating-animation"/>
</template>

<style scoped>
@keyframes placeHolderShimmer {
  0% {
    background-position: -468px 0;
  }
  40% {
    background-position: 468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}
.floating-animation {
  border-radius: 5px;
  animation-delay: 1s;
  animation-duration: 3s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  background-size: 1000px 104px;
  will-change: background-position;
  overflow: hidden;
  height: 100%;
  width: 100%;
}
</style>

<script>
import FloatingDiv from "./FloatingDiv.ts";
export default FloatingDiv;
</script>
