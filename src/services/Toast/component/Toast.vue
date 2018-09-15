<template>
  <v-app id="toast">
    <div 
      @mouseout="isMouseOver = false" 
      @mouseover="isMouseOver = true"
      :class="{'shake':shake, 
               'show': isVisible, 
               'info': intent == 'info',
               'error': intent == 'error', 
               'success': intent == 'success'}" 
      class="toast">
      <div>
      
        <v-layout 
          row 
          align-center 
          justify-center
        >
          <v-btn 
            v-show="!noClose"
            @click="hide" 
            class="close-toast" 
            flat 
            icon 
            color="white">
            <v-icon>close</v-icon>
          </v-btn>
          <div class="mr-3">
            <v-icon 
              v-show="intent == 'info'" 
              class="intent">info</v-icon>
            <v-icon 
              v-show="intent == 'error'" 
              class="intent">error</v-icon>
            <v-icon 
              v-show="intent == 'success'" 
              class="intent">check_circle</v-icon>
          </div>
          <div id="message">{{ message }}</div>
        </v-layout>
        <div 
          v-if="toShowProgress"
          class="progress" 
          :style="progressBarStyle"/>
      </div>
    </div>
  </v-app>
</template>

<style scoped>
.toast {
  z-index: 1000;
  position: fixed;
  bottom: -70px;
  width: 100%;
  height: 54px;
  transition: all 0.3s ease;
  box-shadow: 0 3px 12px 1px rgba(0, 0, 0, 1);
}

.toast.show {
  bottom: 0;
}

.toast > div {
  padding: 10px;
  padding-right: 30px;
  height: 100%;
}

.toast.error > div {
  background-color: #f55252;
}

.toast.info > div {
  background-color: #1eace2;
}

.toast.success > div {
  background-color: #01e471;
}

.toast i.intent {
  font-size: 28px;
  height: 28px;
  width: 28px;
  color: white;
}

.toast #message {
  font-size: 20px;
  color: white;
}

.toast .close-toast {
  position: absolute;
  right: 4px;
  top: 0;
  color: white;
  cursor: pointer;
}

.toast .progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  width: 100%;
  border-radius: 3px;
  background: white;
}

@keyframes shake {
  from,
  to {
    transform: translate3d(0, 0, 0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translate3d(-10px, 0, 0);
  }

  20%,
  40%,
  60%,
  80% {
    transform: translate3d(10px, 0, 0);
  }
}

.shake {
  animation-name: shake;
  animation-duration: 1s;
  animation-fill-mode: both;
}
</style>

<script>
import Toast from "./Toast.ts";
export default Toast;
</script>
