<template>
  <div class="containers">
    <h1>Generate more mind map</h1>
    <div class="v2_44"  @dragover="dragover" @dragleave="dragleave" @drop="drop">
      <input type="file" name="fields[assetsFieldHandle][]" id="assetsFieldHandle"
             class="w-px h-px opacity-0 overflow-hidden absolute" @change="onChange" ref="file" accept=".pdf, .doc, .docx, .txt"  style="display: none"/>
      <div v-if="!isDragged">
        <div class="v2_39"></div>
        <span class="v2_40" v-if="filelist.length === 0">Wikipedia URL</span>
        <span class="v2_40" v-else>Topic</span>
        <div class="v2_41"></div>
        <input class="v2_42" type="text" placeholder="E.g. https://en.wikipedia.org/wiki/Coeus" v-model="url" v-if="filelist.length === 0">
        <input class="v2_42" type="text" placeholder="E.g. Eukaryote" v-model="url" v-else>
        <span class="v2_45" v-if="filelist.length === 0">
            or drag a file here or <span class="underline" @click="chooseFiles()">click here</span> (.pdf, .doc, .docx, .txt)
          </span>
        <span class="v2_45" v-else>
            {{filelist[0].name}}
             <span class="underline" @click="removeFile()">Remove</span>
          </span>
        <button class="generatebtn" @click="generateMap">Generate</button>
      </div>
      <div v-else>
        <div class="v2_39"></div>
        <span class="v2_40">Drop file here!</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MapEditorBottom',
  data() {
    return {
      url: '',
      filelist: [],
      isDragged: false,
    }
  },
  methods: {
    removeFile() {
      this.filelist.splice(0);
    },
    chooseFiles() {
      document.getElementById("assetsFieldHandle").click()
    },
    generateMap() {
      this.$emit('generate-map', {
        'url': this.url,
        'fileList': this.filelist,
      });
    },
    onChange() {
      this.filelist = [...this.$refs.file.files];
    },
    remove(i) {
      this.filelist.splice(i, 1);
    },
    dragover(event) {
      event.preventDefault();
      this.isDragged = true;
    },
    dragleave(event) {
      this.isDragged = false;
    },
    drop(event) {
      event.preventDefault();
      this.isDragged = true;
      this.$refs.file.files = event.dataTransfer.files;
      this.onChange();
      // add generate method
      // Clean up
      this.isDragged = false;
    }
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
}
body {
  color: rgba(85,85,85,1);
}

.underline {
  text-decoration: underline;
}

.v2_44 {
  height: 141px;
  opacity: 1;
  position: relative;
  top: 20%;
  left: 13%;
  margin-bottom: 10%;
}
.v2_39 {
  width: 80%;
  height: 141px;
  opacity: 1;

  border-radius: 20px;
  background: rgba(255, 255, 255, 1) no-repeat center center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15000000596046448);
}
.v2_40 {
  width: 135px;
  color: rgba(0,0,0,1);
  position: absolute;
  top: 22px;
  left: 23px;
  font-weight: Bold;
  font-size: 18px;
  opacity: 1;
  text-align: left;
}

.v2_42 {
  width: 73%;
  color: rgba(119,119,119,1);
  position: absolute;
  top: 53px;
  left: 24px;
  font-size: 16px;
  opacity: 1;
  text-align: left;
  border-radius: 8px;
  border: 1px solid rgba(0,0,0,0.20000000298023224);
  padding-top: 8px;
  padding-bottom: 7px;
}
.v2_45 {

  color: rgba(85,85,85,1);
  position: absolute;
  top: 102px;
  left: 26px;
  font-size: 16px;
  opacity: 1;
  text-align: left;
}
.generatebtn {
  width: 175px;
  height: 50px;
  background: rgba(22,135,167,1);
  border-radius: 32px;
  color: rgba(246,245,245,1);
  font-weight: Bold;
  font-size: 24px;
  border: 0;
  position: absolute;
  left: 65%;
  top: 80%;
  z-index: 20;
}
.generatebtn:hover {
  border: 1px;
}

@media only screen and (max-width: 798px) {
  .generatebtn {
    top: 55%!important;
    margin-left:  -0!important;
    margin-right: auto!important;
    z-index: 10;
    position: sticky!important;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
  }
}

</style>
