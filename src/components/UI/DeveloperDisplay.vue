<template>
  <div class="developer-wrapper">
    <slot name="developer-image"> </slot>
    <slot name="developer-name"> </slot>
    <slot name="developer-role"> </slot>
  </div>
</template>

<script lang="ts">
export default {
  name: "DeveloperDisplay",
};
</script>

<style scoped>
.developer-wrapper {
  text-align: center;
}
</style>
