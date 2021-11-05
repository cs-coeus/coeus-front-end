<template>
  <button class="outline-button"><slot></slot></button>
</template>

<script lang="ts">
export default {
  name: "OutlineButton",
};
</script>

<style scoped>
.outline-button {
  background-color: transparent;
  border: 0;
  padding: 0;
  margin: 0;
  border: 3px solid var(--primary-color);
  padding: 8px 16px;
  border-radius: 32px;
  transition: background-color 0.4s;
}

.outline-button:hover {
  background-color: var(--primary-color);
  color: var(--white);
  cursor: pointer;
}
</style>
