<template>
  <div id="about-us-section" class="about-us-wrapper">
    <h2>About Us</h2>
    <div class="developers-wrapper">
      <div class="developer-container">
        <developer-display>
          <template v-slot:developer-image>
            <img class="developer-image" :src="PeteImage" alt="Pete image" />
          </template>
          <template v-slot:developer-name>
            <h4>Pittawat Taveekitworachai</h4>
          </template>
          <template v-slot:developer-role>
            <p>Developer</p>
          </template>
        </developer-display>
      </div>
      <div class="developer-container">
        <developer-display>
          <template v-slot:developer-image>
            <img class="developer-image" :src="PluemImage" alt="Pete image"
          /></template>
          <template v-slot:developer-name>
            <h4>Wicharn Rueangkhajorn</h4>
          </template>
          <template v-slot:developer-role>
            <p>Developer</p>
          </template>
        </developer-display>
      </div>
      <div class="developer-container">
        <developer-display>
          <template v-slot:developer-image>
            <img class="developer-image" :src="MichalImage" alt="Pete image"
          /></template>
          <template v-slot:developer-name>
            <h4>Michal Zielinski</h4>
          </template>
          <template v-slot:developer-role>
            <p>Developer</p>
          </template>
        </developer-display>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import PeteImage from "../../assets/images/Pete.png";
import PluemImage from "../../assets/images/Pluem.png";
import MichalImage from "../../assets/images/Michal.png";
import DeveloperDisplay from '@/components/UI/DeveloperDisplay.vue';

export default {
  name: "AboutUsSection",
  components: {
    DeveloperDisplay

  },
  setup() {
    return {
      PeteImage,
      PluemImage,
      MichalImage,
    };
  },
};
</script>

<style scoped>
.about-us-wrapper {
  margin-top: 32px;
}

.about-us-wrapper > h2 {
  font-size: 3rem;
  text-align: center;
}

.developers-wrapper {
  display: flex;
  width: 100%;
  margin-top: 32px;
  text-align: center;
  justify-content: center;
  align-items: center;
}

.developers-wrapper .developer-container {
  flex: 1;
}

.developers-wrapper h4 {
  margin-top: 24px;
  font-size: 1.5rem;
}

.developers-wrapper p {
  margin-top: 16px;
  font-size: 1.125rem;
}

.developer-image {
  margin: 0 auto;
  height: 200px;
}

@media only screen and (max-width: 986px) {
  .developers-wrapper {
    display: block;
    justify-content: center;
  }
}
</style>
