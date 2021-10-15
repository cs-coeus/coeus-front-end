<template>
  <div id="app">
    <div class="source" v-if="!showMap">
      <textarea v-model="info" rows="50" cols="200" data-gramm="false" data-gramm_editor="false"></textarea>
    </div>
    <read-file @load="info = $event" v-if="!showMap"></read-file>
    <button @click.prevent="loadExample('example.json')">Load Example 1</button>
    <button @click.prevent="loadExample('example2.json')">Load Example 2</button>
    <br>
    <button @click.prevent="format" v-if="!showMap">Generate mind map</button>
    <div v-if="showMap">
      <MapEditor :tree="formatted"/>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MapEditor from "@/components/MapEditor.vue";
import arrayToTree from 'array-to-tree';
import ReadFile from '@/components/ReadFile.vue';


export default {
  name: 'App',
  components: {
    ReadFile,
    MapEditor
  },
  data() {
    return {
      showMap: false,
      info: "{}",
      formatted: [],
    }
  },
  methods: {
    format() {
      if(this.info!=="") {
        this.showMap = false;

        //JSONifiction
        let list = JSON.parse(this.info.toString())
        //check if contain edges and nodes keys
        if("edges" in list && "nodes" in list) {
          //merge edges and nodes
          let merged = [];
          for(let i=0; i<list.nodes.length; i++) {
            list.nodes[i].name = list.nodes[i]['text'];
            merged.push({
              ...list.nodes[i],
              ...(list.edges.find((itmInner) => itmInner.childId === list.nodes[i].id))},
            );
          }
          //check if left or right side of root
          let leftright = 0;
          for(let i=0; i<merged.length; i++) {
            merged[i].left = (merged[i].parentId === 1 && ++leftright % 2 === 0);
          }
          //convert array version to tree
          let tree = arrayToTree(merged, {
            parentProperty: 'parentId',
            customID: 'id'
          });
          //tree pruning - takes longer time
          tree = this.removeProp(tree, "id")
          tree = this.removeProp(tree, "text")
          tree = this.removeProp(tree, "parentId")

          this.formatted = JSON.parse(JSON.stringify(tree));
          this.showMap = true;
        }
      }
    },
    removeProp(obj, propToDelete) {
      for (var property in obj) {
        if (typeof obj[property] == "object") {
          delete obj.property
          let newJsonData = this.removeProp(obj[property], propToDelete);
          obj[property]= newJsonData
        } else {
          if (property === propToDelete) {
            delete obj[property];
          }
        }
      }
      return obj
    },
    loadExample(name) {
      this.showMap = false;
      axios
        .get(name)
        .then(response => (this.info = JSON.stringify(response.data, 2, ' ')))
    }
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}

.editor {
  width: 20%;
  float: left;
  display:inline;
}
.diagram {
  float: left;
  width: 80%;
  height:900px;
  display:inline;
}
.bottom {
  padding-top: 200px;
  top:200px;
}
.editor textarea {
  width: 100%;
  max-width: 100%;
  height: 800px;
}
</style>
