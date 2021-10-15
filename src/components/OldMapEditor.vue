<template>
  <div class="container" ref="capture">
    <div class="left-top">
      Mind Map based on vue3-mindmap
    </div>
    <div class="right-top"><span>Props</span></div>
    <mindmap
      class="left-bottom"
      v-if="renderComponent"
      v-model="dataM"
      :branch="rangeList['branch'].value"
      :x-gap="rangeList['x-gap'].value"
      :y-gap="rangeList['y-gap'].value"
      :zoom="checkboxList['zoom'].value"
      :fit-btn="checkboxList['fit-btn'].value"
      :center-btn="checkboxList['center-btn'].value"
      :download-btn="checkboxList['download-btn'].value"
      :drag="checkboxList['drag'].value"
      :edit="checkboxList['edit'].value"
      :add-node-btn="checkboxList['add-node-btn'].value"
      :sharp-corner="checkboxList['sharp-corner'].value"
      :ctm="checkboxList['contextmenu'].value"
      :timetravel="checkboxList['timetravel'].value"
    ></mindmap>
    <div class="right-bottom">
      <div v-for="(item, key) in checkboxList" :key="key">
        <input type="checkbox" :name="key.toString()" v-model="item.value" :disabled="item.disabled">
        <label :for="key.toString()">{{ key }}</label>
      </div>
      <div v-for="(item, key) in rangeList" :key="key">
        <input type="range" :name="key" v-model.number="item.value" :min="item.min" :max="item.max">
        <label :for="key">{{ key }}（{{ item.value }}）</label>
      </div>
      <div class="preview">
             <textarea v-model="dataJson" rows="20" cols="50" @change="updateMap" data-gramm="false" data-gramm_editor="false">
      </textarea>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import Mindmap from './Mindmap'

type checkbox = { [key: string]: { value: boolean, disabled?: boolean } }

export default defineComponent({
  name: 'MapEditor',
  components: {
    Mindmap
  },
  props: ['tree'],
  data() {
    return {
      renderComponent: false,
      dataJson: [],
      dataM: []
    }
  },
  watch: {
    dataM() {
      this.dataJson = JSON.stringify(this.dataM, null, 2);
    },
  },
  methods: {
    updateMap() {
      this.renderComponent = false;
      this.dataM = JSON.parse(this.dataJson);
      this.renderComponent = true;
    },
  },
  mounted() {
    this.dataM = this.tree;
    this.renderComponent=true;
  },
  setup () {
    const checkboxList = reactive<checkbox>({
      'center-btn': { value: true },
      'fit-btn': { value: true },
      timetravel: { value: true },
      'download-btn': { value: true },
      'add-node-btn': { value: true },
      zoom: { value: true },
      drag: { value: true },
      edit: { value: true },
      contextmenu: { value: true },
      'sharp-corner': { value: false }
    })
    const rangeList = reactive({
      branch: { value: 4, min: 1, max: 6 },
      'x-gap': { value: 84, min: 0, max: 100 },
      'y-gap': { value: 18, min: 0, max: 100 }
    })

    return {
      checkboxList,
      rangeList
    }
  }
})
</script>

<style lang="scss">
.container {
  width: 100%;
  height: calc(100vh - 16px);
  border-radius: 4px;
  border: thin solid rgba(0,0,0,.12);
  overflow: hidden;
  background-color: rgba(0,0,0,.12);
  display: grid;
  grid-template-columns: 75% 1px 25%;
  grid-template-rows: 48px 1px auto;
}

.right-top {
  grid-column: 3 / 4;
}

.left-bottom {
  grid-row: 3 / 4;
}

.right-bottom {
  grid-column: 3 / 4;
  grid-row: 3 / 4;
  background-color: white;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: scroll;

  div {
    display: flex;
    align-items: center;
    gap: 5px;
  }
}

.left-top,
.right-top {
  background-color: #eee;
  padding: 0 12px;
  display: flex;
  align-items: center;
}

input[type='checkbox'] {
  cursor: pointer;
}

input:disabled {
  cursor: not-allowed;
}
</style>
