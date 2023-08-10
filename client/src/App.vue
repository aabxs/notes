<script>
import { RouterView } from "vue-router";
import Sidebar from "./components/dashboard/sidebar.vue";
import Navbar from "./components/dashboard/navbar.vue";
export default {
  components: {
    Sidebar,
    Navbar,
  },
  data() {
    return {
      counter: 0,
      width: "250px",
    };
  },
  methods: {
    toggle(event) {
      this.counter++;
      if (this.counter % 2 == 0) {
        this.width = "250px";
      } else {
        this.width = "0px";
      }
    },
  },
};
</script>

<template>
  <div class="wrapper">
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <Component :is="Component" :key="$route.path" />
      </Transition>
    </RouterView>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
