<script setup>
defineProps({
  message: {
    type: String,
  },
  success: {
    type: Boolean,
  },
});
</script>

<template>
  <div v-if="success" class="notification-success rounded px-3 py-0 m-4">
    <h6 class="p-3 ps-3">{{ message }}</h6>
    <div class="slider rounded-bottom"></div>
  </div>
  <div v-else class="notification-alert rounded px-3 py-0 m-4">
    <h6 class="p-3 ps-3">{{ message }}</h6>
    <div class="slider rounded-bottom"></div>
  </div>
</template>

<style>
* {
  font-family: "Nunito", sans-serif !important;
}

.notification-alert {
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: #fe5352;
  -webkit-animation: alert 3s;
  animation: alert 3s forwards ease-in-out;
}

.notification-alert h6 {
  margin: 0 !important;
  color: white !important;
  font-weight: bolder;
  font-family: "Nunito", sans-serif !important;
}

.notification-success {
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: #3eb489;
  -webkit-animation: alert 3s;
  animation: alert 3s forwards ease-in-out;
}

.notification-success h6 {
  margin: 0 !important;
  color: white !important;
  font-weight: bolder;
  font-family: "Nunito", sans-serif !important;
}

.slider {
  left: 0px;
  bottom: 0px;
  z-index: 10000;
  position: absolute;
  width: calc(100%);
  height: 4px;
  background: rgba(255, 255, 255, 0.7);
  -webkit-animation: slider 3s;
  animation: slider 3s forwards ease-in-out;
}

@keyframes slider {
  0% {
    width: 100%;
    visibility: visible;
  }
  90% {
    width: 3px;
  }
  100% {
    width: 0px;
    visibility: hidden;
  }
}
@keyframes alert {
  0% {
    opacity: 1;
    visibility: visible;
  }
  80% {
    opacity: 1;
    visibility: visible;
  }
  100% {
    opacity: 0;
    visibility: hidden;
  }
}
</style>
