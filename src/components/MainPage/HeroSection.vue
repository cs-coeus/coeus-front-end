<template>
  <div id="hero-section" class="hero-wrapper">
    <svg
      class="shape"
      viewBox="0 0 645 979"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.999808 391C-3.69497 216.525 138.927 126.78 333.5 0H646C646 0 995 960.5 646 975C297 989.5 21.4999 957.5 21.4999 871C21.4999 784.5 282.423 714.859 208 632C120.619 573.896 7.80551 532.148 0.999808 391Z"
        fill="white"
      />
    </svg>

    <img class="hero-image" :src="HeroImage" alt="hero-image" />

    <div>
      <div class="hero-copy">
        <h1>Generate your Mind Map from any text and files</h1>
        <h2>
          With neural network, keywords are extracted and organized into mind map
          with ease.
        </h2>
      </div>
      <div class="hero-action" @dragover="dragover" @dragleave="dragleave" @drop="drop">
        <input type="file" name="fields[assetsFieldHandle][]" id="assetsFieldHandle"
               class="w-px h-px opacity-0 overflow-hidden absolute" @change="onChange" ref="file" accept=".pdf, .doc, .docx, .txt"  style="display: none"/>
        <div v-if="!isDragged">
          <label>{{ filelist.length === 0 ? 'Wikipedia URL' : 'Topic' }}</label>
          <input
            type="text"
            placeholder="E.g. https://en.wikipedia.org/wiki/Coeus"
            v-model="url" v-if="filelist.length === 0"
          />
          <input
            type="text"
            placeholder="E.g. KMUTT, Rice"
            v-model="url" v-else
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
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import HeroImage from "../../assets/images/HeroImage.svg";
import PrimaryButton from '@/components/UI/PrimaryButton.vue';
import LinkButton from '@/components/UI/LinkButton.vue';

export default {
  name: "HeroSection",
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
      this.filelist = [...this.$refs.file.files];
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

    return {
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
    };
  },
  methods: {
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
};
</script>

<style scoped>
.hero-wrapper {
  display: flex;
  align-items: center;
  height: 100vh;
  margin: 0 -96px;
  padding: 96px 96px 0 96px;
  background-color: var(--background-color);
  isolation: isolate;
}

.hero-wrapper > svg {
  height: 101%;
}

.hero-copy {
  width: 50%;
}

.hero-copy > h1 {
  font-size: 3.75rem;
}

.hero-copy > h2 {
  margin-top: 36px;
  font-size: 1.5rem;
  font-weight: normal;
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

.shape {
  position: absolute;
  right: 0;
  top: 0;
  z-index: -1;
}

.hero-image {
  position: absolute;
  min-width: 350px;
  right: 96px;
  top: 15%;
  width: 40%;
  z-index: -1;
}

@media only screen and (max-width: 986px) {
  .hero-wrapper {
    flex-flow: column-reverse;
    justify-content: start;
    margin: 0 -48px;
    padding: 96px 48px 0;
  }

  .shape {
    display: none;
  }
  .hero-wrapper .hero-copy h1 {
    font-size: 2rem;
  }

  .hero-wrapper .hero-copy h2 {
    margin-top: 16px;
    font-size: 1.5rem;
  }

  .hero-image {
    min-width: 240px;
    position: static;
    width: 30%;
    margin: 0 auto;
  }

  .hero-copy {
    width: 100%;
  }

  .hero-action {
    margin: 1.5rem auto;
    width: 100%;
  }

  .hero-cta {
    bottom: -20%;
  }
}

@media only screen and (max-width: 768px) {
  .hero-wrapper .hero-copy h1 {
    font-size: 1.5rem;
  }

  .hero-wrapper .hero-copy h2 {
    font-size: 1rem;
  }

  .hero-wrapper .hero-action {
    margin-top: 16px;
  }
}
</style>
