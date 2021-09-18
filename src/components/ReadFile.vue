<template>
  <div>
      <input type="file" @change="loadTextFromFile">
  </div>
</template>

<script>
export default {
  name: 'ReadFile',
  methods: {
    loadTextFromFile(ev) {
      const file = ev.target.files[0];
      const reader = new FileReader();

      reader.onload = e => this.$emit("load", e.target.result);
      reader.readAsText(file);
    }
  }
}
</script>

<style scoped>

</style>
