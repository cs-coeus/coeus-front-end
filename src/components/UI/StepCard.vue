<template>
  <div class="card">
    <div class="card-header">
      <slot name="card-header"> </slot>
    </div>
    <div class="card-content">
      <slot name="card-content"> </slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "StepCard",
};
</script>

<style scoped>
.card {
  padding: 32px;
  border-radius: 16px;
  width: 300px;
  height: 200px;
  background: var(--white);
  box-shadow: 0 8px 24px 0 var(--black-a15);
}

.card-header {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 16px;
}
</style>
