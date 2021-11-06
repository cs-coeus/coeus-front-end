<template>
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
</template>

<script lang="ts">
import { ref } from 'vue';
import PrimaryButton from '@/components/UI/PrimaryButton.vue';
import LinkButton from '@/components/UI/LinkButton.vue';
import HeroImage from '../../assets/images/HeroImage.svg';

export default {
  name: 'InputForm',
  components: {
    LinkButton,
    PrimaryButton,
  },
  delimiters: ['${', '}'],
  emits: ['generate-map'],
  setup(__,{emit}) {
    const url = ref('');
    const filelist = ref([]);
    const isDragged = ref(false);
    const file = ref(null);

    function removeFile() {
      filelist.value.splice(0);
    }

    function chooseFiles() {
      document.getElementById("assetsFieldHandle").click()
    }

    function generateMap() {
      emit('generate-map', {
        'url':url.value,
        'fileList': filelist.value,
      });
    }

    function onChange() {
      filelist.value = [...file.value.files];
    }

    function remove(i) {
      filelist.value.splice(i, 1);
    }

    function dragover(event) {
      event.preventDefault();
      isDragged.value = true;
    }

    function dragleave(event) {
      isDragged.value = false;
    }

    function drop(event) {
      event.preventDefault();
      isDragged.value = true;
      file.value.files = event.dataTransfer.files;
      onChange();
      // Clean up
      isDragged.value = false;
    }

    return {
      file,
      HeroImage,
      url,
      filelist,
      isDragged,
      removeFile,
      chooseFiles,
      generateMap,
      onChange,
      remove,
      dragover,
      dragleave,
      drop
    };
  },
}
</script>

<style scoped>
.hero-action {
  position: relative;
  padding: 24px;
  margin-top: 32px;
  background-color: var(--white);
  border-radius: 16px;
  box-shadow: 0 8px 24px 0 var(--black-a15);
  width: 50%;
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

  .hero-cta {
    bottom: -20%;
  }
}
@media only screen and (max-width: 768px) {
  .hero-action {
    margin-top: 16px;
  }
}
</style>
