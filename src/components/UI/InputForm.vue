<template>
  <div class="hero-action" @dragover="dragover" @dragleave="dragleave" @drop="drop">
    <input type="file" name="fields[assetsFieldHandle][]" id="assetsFieldHandle"
           class="w-px h-px opacity-0 overflow-hidden absolute" @change="onChange" ref="file" accept=".pdf, .doc, .docx, .txt"  style="display: none"/>
    <div v-if="!isDragged">
      <label>{{ semiStructure ? 'Wikipedia URL' : 'Title' }}</label>
      <div class="float-right"> Unstructured
        <label class="switch">
          <input type="checkbox" v-model="semiStructure">
          <span class="slider round"></span>
        </label>
        Semi-structured
      </div>
      <input
        type="text"
        :placeholder="semiStructure ? 'E.g. https://en.wikipedia.org/wiki/Coeus' : 'E.g. KMUTT, Rice'"
        v-model="url"
      />
      <p v-if="!semiStructure && !filelist.length">
        or <link-button @click="chooseFiles()">Upload a file</link-button> (.pdf, .doc, .docx, .txt)
      </p>
      <p v-if="semiStructure">&nbsp;&nbsp;</p>
      <p v-if="!semiStructure && filelist.length">
        {{filelist[0].name}} <link-button @click="removeFile()">REMOVE</link-button>
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
    const semiStructure = ref(true)
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
      let file = semiStructure.value ? '' : filelist.value;
      emit('generate-map', {
        'url':url.value,
        'fileList': file,
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
      semiStructure,
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

.float-right {
  float: right;
  padding-bottom: 8px;
  padding-right: 2px;
}
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

.switch {
  position: relative;
  display: inline-block;
  width: 52px;
  height: 25px;
  margin-right: 0;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input + .slider {
  background-color: var(--primary-color);
}

input:focus + .slider {
  box-shadow: 0 0 1px var(--primary-color);
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
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
