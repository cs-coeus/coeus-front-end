<template>
  <div>
    <div class="editor">
      <div class="slidecontainer">
        <input type="range" min="1" max="100" v-model="branch"  class="slider"> branch ({{branch}})
      </div>
      <div class="slidecontainer">
        <input type="range" min="0" max="100" v-model="xGap" class="slider"> x-gap ({{xGap}})
      </div>
      <div class="slidecontainer">
        <input type="range" min="0" max="100" v-model="yGap"  class="slider"> y-gap ({{yGap}})
      </div>
      <textarea v-model="dataJson" rows="30" cols="90" @change="updateMap" data-gramm="false" data-gramm_editor="false"></textarea>
    </div>
    <div class="diagram">
      <mindmap v-model="dataM" :edit="editable" v-if="renderComponent"></mindmap>
    </div>
  </div>
</template>

<script>
import mindmap from 'vue3-mindmap'
import 'vue3-mindmap/dist/style.css'

export default {
  components: { mindmap },
  name: "MapEditor2",
  props: ['tree'],
  data() {
    return {
      branch: 4,
      xGap: 80,
      yGap: 20,
      renderComponent: false,
      editable: true,
      dataJson: [],
      dataM: [{
        "name":"如何学习D3",
        "children": [
          {
            "name":"预备知识",
            "children": [
              { "name":"HTML & CSS" },
              { "name":"JavaScript" },
            ]
          },
          {
            "name":"安装",
            "collapse": true,
            "children": [ { "name": "折叠节点" } ]
          },
          { "name":"进阶", "left": true },
        ]
      }]
    }
  },
  watch: {
    dataM() {
      this.dataJson = JSON.stringify(this.dataM, null, 2);
    },
  },
  mounted() {
    console.log("ok");
    this.dataM = this.tree;
    this.renderComponent=true;

  },
  methods: {
    updateMap() {
      this.renderComponent = false;
      this.dataM = JSON.parse(this.dataJson);
      this.renderComponent = true;
    },
  },
}
</script>

<style scoped>

</style>