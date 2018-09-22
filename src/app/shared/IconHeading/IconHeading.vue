<template>
  <v-layout 
    class="mb-3" 
    row 
    v-if="text">
    <v-icon class="mr-3">{{ icon }}</v-icon>
    <h2 class="font-weight-regular">{{ text }}</h2>
  </v-layout>
  <div 
    class="placeholder" 
    v-else>
    <FloatingDiv class="icon"/>
    <FloatingDiv class="text1"/>
  </div>
</template>

<style scoped>
.placeholder {
  height: 30px;
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
}
.icon {
  width: 30px;
  margin-right: 10px;
}
.text1 {
  width: 25%;
  margin-right: 10px;
}
</style>


<script>
import IconHeading from "./IconHeading.ts";
export default IconHeading;
</script>
