<template>
  <button class="primary-button"><slot></slot></button>
</template>

<script lang="ts">
export default {
  name: "PrimaryButton",
};
</script>

<style scoped>
.primary-button {
  font-weight: bold;
  color: var(--white);
  background-color: var(--primary-color);
  border: 0;
  padding: 0;
  margin: 0;
  padding: 8px 32px;
  border-radius: 32px;
  transition: background-color 0.4s;
  cursor: pointer;
  border: 3px solid var(--primary-color);
}

.primary-button:hover {
  color: var(--primary-color);
  background-color: var(--white);
}
</style>
