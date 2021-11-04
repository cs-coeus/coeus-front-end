<template>
  <div :class="sectionClass"><h1>{{title}}</h1>
    <p>
      <slot></slot>
    </p>
  </div>
</template>

<script>
export default {
  props: ['sectionClass', 'title'],
  name: 'InfoBlock'
}
</script>

<style scoped>

</style>
