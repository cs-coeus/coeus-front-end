<template>
    <div class="left blueBg">
      <h1 class="pl pr pt2">Generate your
        Mind Map from
        any text and files</h1>
      <p class="pl pr2">With neural network, keywords are extracted
        and organized into mind map with ease.</p>
      <div class="v2_44"  @dragover="dragover" @dragleave="dragleave" @drop="drop">
        <input type="file" name="fields[assetsFieldHandle][]" id="assetsFieldHandle"
               class="w-px h-px opacity-0 overflow-hidden absolute" @change="onChange" ref="file" accept=".pdf, .doc, .docx, .txt"  style="display: none"/>
        <div v-if="!isDragged">
          <div class="v2_39"></div>
          <span class="v2_40">Wikipedia URL</span>
          <div class="v2_41"></div>
          <input class="v2_42" type="text" placeholder="E.g. https://en.wikipedia.org/wiki/Coeus" v-model="url">
          <span class="v2_45">or drag a file here or <span class="underline" @click="chooseFiles()">click here</span> (.pdf, .doc, .docx, .txt)</span>
          <button class="generatebtn" @click="generateMap">Generate</button>
        </div>
        <div v-else>
          <div class="v2_39"></div>
          <span class="v2_40">Drop file here!</span>
        </div>
      </div>
    </div>
    <div class="right pt2 short"><img src="../../../assets/images/v2_47.png"></div>
</template>

<script>
export default {
  name: 'GenerateFormTop',
  delimiters: ['${', '}'],
  data() {
    return {
      url: '',
      filelist: [],
      isDragged: false,
    }
  },
  methods: {
    chooseFiles() {
      document.getElementById("assetsFieldHandle").click()
    },
    generateMap() {
      this.$emit('generate-map', {
        'url':this.url,
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
[v-cloak] {
  display: none;
}
body {
  font-family: Helvetica;
}
.underline {
  text-decoration: underline;
}
.left {
  width: 50%;
  height: 100%;
  top:0;
  float: left;
}
.right {
  width: 50%;
  height: 100vh;
  top:0;
  float:right;
}
.right img {
  max-height:528px;
}

@media only screen and (max-width: 798px) {
  .short {
    height: 30vh;
  }
  .left {
    width: 100%;
    height: 100%;
  }
  .right {
    width: 100%;
    background-color: rgba(235,246,255,1);
  }
  .generatebtn {
    top: 55%!important;
    margin-left:  -0!important;
    margin-right: auto!important;
    z-index: 10;
    position: sticky!important;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%!important;
  }
  .right img {
    max-height:528px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
  }
  .v2_45 {
    overflow: fragments;
  }
}

.v2_44 {
  margin-top: 20%;
  height: 141px;
  opacity: 1;
  position: relative;
  top: 30%;
  left: 13%;
  margin-bottom: 10%;
}
.v2_39 {
  width: 80%;
  height: 141px;
  background: rgba(255,255,255,1);
  opacity: 1;
  border-radius: 16px;
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
  left: 55%;
  top: 80%;
  z-index: 10;
}
.generatebtn:hover {
  border: 1px;
}
</style>
