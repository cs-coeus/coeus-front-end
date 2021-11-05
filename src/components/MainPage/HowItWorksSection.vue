<template>
  <div id="how-it-work-section" class="how-it-works-wrapper">
    <h2 >How it works</h2>
    <p>How your text transform into mind map</p>
    <div class="steps">
      <img
        class="left-image"
        :src="HowItWorksImage2"
        alt="how it works image 2"
      />
      <img
        class="right-image"
        :src="HowItWorksImage1"
        alt="how it works image 1"
      />
      <step-card class="step first-step">
        <template v-slot:card-header>
          <h3>Step 1</h3>
        </template>
        <template v-slot:card-content>
          <p>Extract text from a file or a Wikipedia article.</p>
        </template>
      </step-card>
      <step-card class="step second-step">
        <template v-slot:card-header>
          <h3>Step 2</h3>
        </template>
        <template v-slot:card-content>
          <p>
            Feed raw text data to model for analyze the structure and important
            keywords.
          </p>
        </template>
      </step-card>
      <step-card class="step third-step">
        <template v-slot:card-header>
          <h3>Step 3</h3>
        </template>
        <template v-slot:card-content>
          <p>
            Convert results from model into data structure applicable for mind
            map visualization.
          </p>
        </template>
      </step-card>
      <step-card class="step forth-step">
        <template v-slot:card-header>
          <h3>Step 4</h3>
        </template>
        <template v-slot:card-content>
          <p>Read mind map data and display the corresponding mind map.</p>
        </template>
      </step-card>
    </div>
  </div>
</template>

<script lang="ts">

import HowItWorksImage1 from "../../assets/images/HowItWorks1.svg";
import HowItWorksImage2 from "../../assets/images/HowItWorks2.svg";
import StepCard from '@/components/UI/StepCard.vue';

export default {
  name: "HowItWorksSection",
  components: {
    StepCard

  },
  setup() {
    return {
      HowItWorksImage1,
      HowItWorksImage2,
    };
  },
};
</script>

<style scoped>
.how-it-works-wrapper {
  margin-top: 32px;
  margin-bottom: 192px;
  isolation: isolate;
}

.how-it-works-wrapper > h2 {
  font-size: 3rem;
  text-align: center;
}

.how-it-works-wrapper > p {
  font-size: 1.125rem;
  text-align: center;
}

.how-it-works-wrapper .steps {
  position: relative;
  margin: 0 auto;
  margin-top: 64px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "a b"
    "c d";
  row-gap: 64px;
  align-items: center;
  max-width: 800px;
}

.how-it-works-wrapper .steps > img {
  position: absolute;
  max-width: 400px;
  width: 30%;
  min-width: 300px;
}

.how-it-works-wrapper .steps > img.left-image {
  bottom: 10%;
  left: -10%;
}

.how-it-works-wrapper .steps > img.right-image {
  top: -5%;
  right: -20%;
}

.how-it-works-wrapper .steps .step {
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.how-it-works-wrapper .steps .step.first-step {
  grid-area: a;
}

.how-it-works-wrapper .steps .step.second-step {
  grid-area: b;
}

.how-it-works-wrapper .steps .step.third-step {
  grid-area: c;
}

.how-it-works-wrapper .steps .step.forth-step {
  grid-area: d;
}

@media only screen and (max-width: 986px) {
  .how-it-works-wrapper {
    margin-top: 64px;
    margin-bottom: 96px;
  }

  .how-it-works-wrapper .steps {
    display: flex;
    flex-flow: column;
  }

  .how-it-works-wrapper .steps > img {
    display: none;
  }
}
</style>
