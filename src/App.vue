<template>
  <div id="app">
    <div class="source" v-if="!showMap">
      <textarea v-model="info" rows="20" cols="200" data-gramm="false" data-gramm_editor="false"></textarea>
    </div>
    <button @click.prevent="loadExample('example.json')">Load Example 1</button>
    <button @click.prevent="loadExample('example2.json')">Load Example 2</button>
    <button @click.prevent="format" v-if="!showMap">Generate mind map</button>
    <div v-if="showMap">
      <MapEditor :tree="formatted"/>
    </div>
<!--    <map-editor2></map-editor2>-->
  </div>
</template>

<script>
import axios from "axios";
import MapEditor from "./components/MapEditor";

export default {
  name: 'App',
  components: {
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
        let list = JSON.parse(this.info)
        //correct assign parentId
        var leftright = 0;
        for (var i = 0; i <= list.edges.length; i++) {
          list.nodes[i].name = list.nodes[i]['text'];
          //add remove text key
          if(i!==list.edges.length) {
            list.nodes[list.edges[i].childId - 1].parentId = list.edges[i].parentId;
            if (list.nodes[i].parentId === 1 && ++leftright % 2 === 0) list.nodes[i].left = true;
          }
        }
        //convert array version to tree
        var arrayToTree = require('array-to-tree');
        let tree = arrayToTree(list['nodes'], {
          parentProperty: 'parentId',
          customID: 'id'
        });
        this.info = JSON.stringify(tree)
        this.formatted = JSON.parse(JSON.stringify(tree));
        this.showMap = true;
      }
    },
    loadExample(name) {
      this.showMap = false;
      axios
          .get('/'+name)
          .then(response => (this.info = JSON.stringify(response.data)))
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
