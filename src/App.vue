<template>
  <div id="app">
    <TopNavbar :isHome="isHome" @go-home="goHome"></TopNavbar>
    <div v-if="isHome">
      <dialog-window :show='!!error' title='error' @close='handleError'>
        <p>{{error}}</p>
      </dialog-window>
      <dialog-window fixed :show='isLoading' title='Generating mind map...'>
        <LoadingSpinner v-if="isLoading"></LoadingSpinner>
      </dialog-window>
      <generate-form-top @generate-map="generateMap"></generate-form-top>
      <div class="clearfix"></div>
      <div class="containers">
        <services-and-public-api-section></services-and-public-api-section>
        <how-it-works-section></how-it-works-section>
        <div class="clearfix"></div>
        <about-us-section></about-us-section>
      </div>
    </div>
    <div v-if="!isHome">
      <MapEditor :tree="formatted" v-if="!isHome"/>
      <map-editor-bottom v-if="!isHome" @generate-map="generateMap"></map-editor-bottom>
    </div>
    <div class="clearfix"></div>
    <page-footer></page-footer>
  </div>
</template>
<script>
import PageFooter from '@/components/PageComponents/PageFooter.vue';
import MapEditor from "@/components/PageComponents/MapEditorComponents/MapEditor.vue";
import MapEditorBottom from '@/components/PageComponents/MapEditorComponents/MapEditorBottom.vue';
import arrayToTree from 'array-to-tree';
import TopNavbar from '@/components/PageComponents/TopNavbar.vue';
import GenerateFormTop from '@/components/PageComponents/LandingPageComponents/GenerateFormTop.vue';
import ServicesAndPublicApiSection from '@/components/PageComponents/LandingPageComponents/ServicesAndPublicApiSection.vue';
import HowItWorksSection from '@/components/PageComponents/LandingPageComponents/HowItWorksSection.vue';
import AboutUsSection from '@/components/PageComponents/LandingPageComponents/AboutUsSection.vue';
import LoadingSpinner from '@/components/PageComponents/UI/LoadingSpinner.vue';
import DialogWindow from '@/components/PageComponents/UI/DialogWindow.vue';
export default {
  name: 'App',
  components: {
    DialogWindow,
    LoadingSpinner,
    AboutUsSection,
    HowItWorksSection,
    ServicesAndPublicApiSection,
    GenerateFormTop,
    TopNavbar,
    MapEditorBottom,
    PageFooter,
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
      //temporary read file for testing; in future send whole file to server
      if(event.fileList.length > 0) {
        url = 'http://coeus.sit.kmutt.ac.th/api/main/predict/unstructured';
        body = {
          "topic": event.url,
          "text": "In the summer of 2017, the Toelupe family heard about a little blue house in Provo, Utah, ..."
        };
      } else {
        //check if it is an URL or just text
        let wiki_path = event.url;
        if(event.url.includes('https://')) {
          wiki_path = event.url.split('/').slice(-1)[0];
        }

        url = 'http://coeus.sit.kmutt.ac.th/api/main/predict/semi-structured';
        body = {
          'wiki_path': wiki_path,
        };
      }

      let response = await fetch(url,{
        method: 'POST',
        headers: {
          'Authorization': 'Bearer '  + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
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

<style>
* {
  box-sizing: border-box;
}
body {
  font-size: 14px;
  font-family: Helvetica;
}

.blueBg {
  background: rgba(235,246,255,1);
}

.pl {
  padding-left: 16%;
}
.pr0 {
  padding-right: 10%;
}
.pr {
  padding-right: 16%;
}
.pr2 {
  padding-right: 20%;
}
.pt1 {
  padding-top: 10%;
}
.pt2 {
  padding-top: 20%;
}
h1 {
  font-weight: Bold;
  font-size: 60px;
  opacity: 1;
}
p {
  font-size: 18px;
}

.containers {
  width: 90%;
  margin-right: 5%;
  margin-left: 5%;
}

.clearfix::after {
  content: "";
  clear: both;
  display: table;
}
</style>
