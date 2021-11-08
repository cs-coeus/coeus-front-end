<template>
  <div>
    <h1>Generate more mind map</h1>
    <input-form @generate-map="generateMap"></input-form>
  </div>
</template>

<script lang="ts">
import PrimaryButton from '@/components/UI/PrimaryButton.vue';
import InputForm from '@/components/UI/InputForm.vue';
export default {
  emits: ['generate-map'],
  name: 'MapEditorBottom',
  components: {InputForm, PrimaryButton},
  setup(__, {emit}) {
    function generateMap(event) {
      emit('generate-map', event);
    }
    return {generateMap}
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
  padding: 24px 0;
}

.hero-action {
  margin: auto;
}

@media only screen and (max-width: 986px) {
  .hero-action {
    margin: 1.5rem auto;
    width: 100%;
  }
}

</style>
