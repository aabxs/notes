<script>
export default {
  emits: ["logout"],
};
</script>
<template>
  <div class="row m-0">
    <div class="col-12 d-flex justify-content-end align-items-center pb-3">
      <button @click="$emit('logout')" class="btn-primary btn">Log Out</button>
    </div>
  </div>
</template>
