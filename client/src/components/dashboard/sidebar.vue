<script setup>
import { RouterLink, RouterView } from "vue-router";
defineProps({
  width: {
    type: String,
  },
});
</script>
<template>
  <div class="sidebar">
    <div style="height: 48px" class="mt-3"></div>
    <div class="p-3">
      <RouterLink to="/" style="text-decoration: none">
        <div class="sidebar-link py-2 px-3 mb-1 rounded-4">Notes</div>
      </RouterLink>
      <RouterLink to="/server" style="text-decoration: none">
        <div class="sidebar-link py-2 px-3 mb-1 rounded-4">Starred</div>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
div.sidebar {
  width: 250px;
  height: 100%;
  margin-left: calc(v-bind(width) - 250px);
  position: fixed;
  transition: ease 500ms;
}

div.sidebar-link {
  text-decoration: none !important;
  font-weight: 700;
  position: relative;
}

div.sidebar-link:hover {
  background: rgba(59, 55, 55, 0.67);
  backdrop-filter: blur(62px);
  text-decoration: none !important;
  font-weight: 700;
}
</style>
