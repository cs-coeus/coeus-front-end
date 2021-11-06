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
  position: relative;
  padding: 24px;
  margin-top: 32px;
  background-color: var(--white);
  border-radius: 16px;
  box-shadow: 0 8px 24px 0 var(--black-a15);
  width: 50%;
  margin: auto;
}

.hero-action label {
  font-size: 1.125rem;
  font-weight: bold;
}

.hero-action  input {
  margin-top: 8px;
  width: 100%;
  border: 1px solid var(--black-a20);
  border-radius: 8px;
  padding: 4px 8px;
}

.hero-action  p {
  color: var(--grey);
  margin-top: 8px;
}

.hero-cta {
  font-size: 1.25rem;
  position: absolute;
  bottom: -16px;
  right: -16px;
}

@media only screen and (max-width: 986px) {
  .hero-action {
    margin: 1.5rem auto;
    width: 100%;
  }
}

</style>
