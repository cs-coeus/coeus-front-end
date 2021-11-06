<template>
  <div class="containers">
    <h1>Generate more mind map</h1>
    <div class="hero-action" @dragover="dragover" @dragleave="dragleave" @drop="drop">
      <input type="file" name="fields[assetsFieldHandle][]" id="assetsFieldHandle"
             class="w-px h-px opacity-0 overflow-hidden absolute" @change="onChange" ref="file" accept=".pdf, .doc, .docx, .txt"  style="display: none"/>
      <div v-if="!isDragged">
        <label>{{ filelist.length === 0 ? 'Wikipedia URL' : 'Topic' }}</label>
        <input
          type="text"
          :placeholder="filelist.length === 0 ? 'E.g. https://en.wikipedia.org/wiki/Coeus' : 'E.g. KMUTT, Rice'"
          v-model="url"
        />
        <p v-if="filelist.length === 0">
          or <link-button @click="chooseFiles()">Upload a file</link-button> (.pdf, .doc, .docx, .txt)
        </p>
        <p v-else>
          {{filelist[0].name}} <link-button @click="removeFile()">remove</link-button>
        </p>
        <primary-button class="hero-cta" @click="generateMap">Generate</primary-button>
      </div>
      <div v-else>
        <label>Drop file here!</label>
      </div>
    </div>
  </div>
</template>

<script>
import PrimaryButton from '@/components/UI/PrimaryButton.vue';
export default {
  name: 'MapEditorBottom',
  components: {PrimaryButton},
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
  padding: 24px 0;
}
body {
  color: rgba(85,85,85,1);
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
