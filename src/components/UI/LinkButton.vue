<template>
  <button class="link-button"><slot></slot></button>
</template>

<script lang="ts">
export default {
  name: "LinkButton",
};
</script>

<style scoped>
.link-button {
  color: inherit;
  text-decoration: underline;
  background-color: transparent;
  border: 0;
  padding: 0;
  margin: 0;
  cursor: pointer;
  transition: color 0.2s;
}

.link-button:hover {
  color: var(--primary-color);
}
</style>
