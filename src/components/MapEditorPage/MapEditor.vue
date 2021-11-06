<template>
  <div>
    <mindmap
      class="left-bottom editor"
      v-if="renderComponent"
      v-model="dataM"
      :branch="rangeList['branch'].value"
      :x-gap="rangeList['x-gap'].value"
      :y-gap="rangeList['y-gap'].value"
      :zoom="zoom"
      :fit-btn="fit"
      :center-btn="center"
      :download-btn="download"
      :drag="drag"
      :edit="edit"
      :add-node-btn="addNode"
      :sharp-corner="sharp"
      :ctm="contextmenu"
      :timetravel="timetravel"
    ></mindmap>
    <div class="containers">
      <div class="inline">
        <input type="checkbox" name="sharp" id="sharp" v-model="sharp">
        <label for="sharp">Sharp corners</label>
      </div>
      <div v-for="(item, key) in rangeList" :key="key" class="inline">
        <input type="range" :name="key" v-model.number="item.value" :min="item.min" :max="item.max"><br>
        <label :for="key">{{ key }}（{{ item.value }}）</label>
      </div>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue'
import Mindmap from '../Mindmap'
type checkbox = { [key: string]: { value: boolean, disabled?: boolean } }

export default defineComponent({
  name: 'MapEditor',
  components: {
    Mindmap
  },
  props: ['tree'],
  setup (props) {
    const renderComponent = ref(false);
<<<<<<< HEAD
=======
    const dataJson = reactive([]);
>>>>>>> 41b4715 (feat: refactor mapEditor to composed API, fix styling)
    const center = ref(true);
    const fit = ref(true);
    const timetravel = ref(true);
    const download = ref(true);
    const addNode = ref(true);
    const zoom = ref(true);
    const drag = ref(true);
    const edit = ref(true);
    const contextmenu = ref(true);
    const sharp = ref(false);
    const dataM = ref('');

    const rangeList = reactive({
      branch: { value: 4, min: 1, max: 6 },
      'x-gap': { value: 84, min: 0, max: 100 },
      'y-gap': { value: 18, min: 0, max: 100 }
    });

    function scrollToTop() {
      window.scrollTo(0,0);
    }

    function init() {
      dataM.value = props.tree;
      renderComponent.value=true;
      scrollToTop();
    }

    onMounted(init)

    return {
      renderComponent,
<<<<<<< HEAD
=======
      dataJson,
>>>>>>> 41b4715 (feat: refactor mapEditor to composed API, fix styling)
      center,
      fit,
      timetravel,
      download,
      addNode,
      zoom,
      drag,
      edit,
      contextmenu,
      sharp,
      dataM,
      rangeList,
    }
  }
})
</script>

<style lang="scss">
.Mindmap_svg_fgvb6 {
  background-color: rgba(235,246,255,1);
}
.editor {
  top:5px;
  width: 100vw;
  height: 80vh;
  margin-left: -96px;
}

.container {
  width: 100%;
  height: 100vh;
  border-radius: 4px;
  border: thin solid rgba(0,0,0,.12);
  overflow: hidden;
  background-color: rgba(0,0,0,.12);
  display: grid;
  grid-template-columns: 75% 1px 25%;
  grid-template-rows: 48px 1px auto;
}
.inline {
  width: 25%;
  padding-top:20px;
  padding-bottom:20px;
  float:left;
  padding-left: 10%;
}

.clearfix::after {
  content: "";
  clear: both;
  display: table;
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

@media only screen and (max-width: 986px) {
  .inline {
    width: 100%;
    padding-top:20px;
    padding-bottom:20px;
    float:left;
    padding-left: 10%;
  }

  .editor {
    margin-left: -48px;
  }

}
</style>
