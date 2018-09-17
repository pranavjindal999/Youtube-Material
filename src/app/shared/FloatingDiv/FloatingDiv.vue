<template>
  <div class="floating-animation">
    <slot/>
  </div>
</template>

<style scoped>
@keyframes placeHolderShimmer {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}
.floating-animation {
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background: #f6f7f8;
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  background-size: 1000px 104px;
  overflow: hidden;
  height: 100%;
  width: 100%;
}
</style>

<script>
import FloatingDiv from "./FloatingDiv.ts";
export default FloatingDiv;
</script>
