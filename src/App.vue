<template>
  <div id="app">

    <dialog-window :show='!!error' title='ERROR' @close='handleError'>
      <p>{{error}}</p>
    </dialog-window>
    <dialog-window fixed :show='isLoading' title='Generating mind map...'>
      <LoadingSpinner v-if="isLoading"></LoadingSpinner>
    </dialog-window>

    <nav-bar :isHome="isHome" @go-home="goHome"/>
    <div v-if="isHome">

      <hero-section @generate-map="generateMap"></hero-section>
      <features-section></features-section>
      <how-it-works-section></how-it-works-section>
      <about-us-section></about-us-section>

    </div>
    <div v-if="!isHome">
      <MapEditor :tree="formatted" v-if="!isHome"/>
      <map-editor-bottom v-if="!isHome" @generate-map="generateMap"></map-editor-bottom>
    </div>

    <footer-section></footer-section>
  </div>
</template>
<script>

import MapEditor from "@/components/MapEditorPage/MapEditor.vue";
import MapEditorBottom from '@/components/MapEditorPage/MapEditorBottom.vue';
import arrayToTree from 'array-to-tree';

import LoadingSpinner from '@/components/UI/LoadingSpinner.vue';
import DialogWindow from '@/components/UI/DialogWindow.vue';
import NavBar from '@/components/UI/NavBar.vue';
import HeroSection from '@/components/MainPage/HeroSection.vue';
import FeaturesSection from '@/components/MainPage/FeaturesSection.vue';
import HowItWorksSection from '@/components/MainPage/HowItWorksSection.vue';
import AboutUsSection from '@/components/MainPage/AboutUsSection.vue';
import FooterSection from '@/components/UI/FooterSection.vue';

export default {
  name: 'App',
  components: {
    FooterSection,
    FeaturesSection,
    HeroSection,
    NavBar,
    DialogWindow,
    LoadingSpinner,
    AboutUsSection,
    HowItWorksSection,
    MapEditorBottom,
    MapEditor
  },
  data() {
    return {
      isHome: true,
      info: "{}",
      formatted: [],
      error: null,
      isLoading: false,
    }
  },
  methods: {
    goHome() {
      this.isHome = true;
    },
    async generateMap(event) {
      this.isHome = true;
      this.isLoading = true;
      try {
        await this.requestData(event);
      } catch (err) {
        this.error = err.message || 'failed to generate mind map';
      }
      this.isLoading = false;
    },
    async requestData(event) {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiSSBBTSBBVVRIRU5USUNBVEVEISBzdGZnQXM4S3VDMmZOUVJ1ckhkVmFjQUFjTW1VQXJRcSJ9._ft_CMR27CE8ySY55KiH34uWnFJmdaLoCH8XYBFqWmQ';
      let url = null;
      let body = null;
      let header = {
        'Authorization': 'Bearer '  + token,
      };

      if(event.fileList.length > 0) {
        //setting for sending unstructured type
        if(event.url === '') {
          throw new Error('Topic cannot be empty');
        }

        url = 'http://coeus.sit.kmutt.ac.th/api/main/predict/unstructured/file';
        body = new FormData();
        body.append('topic', event.url);
        body.append('file', event.fileList[0]);
      } else {
        //setting for sending semi-structured type
        if(event.url === '') {
          throw new Error('Wikipedia URL cannot be empty');
        }

        let wiki_path = event.url;
        if(event.url.includes('wikipedia.org/')) {
            wiki_path = event.url.split('/').slice(-1)[0];
        }
        url = 'http://coeus.sit.kmutt.ac.th/api/main/predict/semi-structured';
        header['Content-Type'] = 'application/json';
        body = JSON.stringify({
          'wiki_path': wiki_path,
        });
      }

      let response = await fetch(url,{
        method: 'POST',
        headers: header,
        body: body,
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'failed to fetch');
      } else {
        this.info = JSON.stringify(responseData.result);
        this.format();
      }

    },
    format() {
      if(this.info!=="") {
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
          this.isHome = false;
        }
      } else {
        throw new Error('There was some error');
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
    handleError() {
      this.error = null;
    }
  }
}
</script>
<style scoped>
#app {
  padding: 0 96px;
}

@media only screen and (max-width: 986px) {
  #app {
    padding: 0 48px;
  }
}
</style>
