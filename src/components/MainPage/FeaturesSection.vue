<template>
  <div class="feature-wrapper">
    <div class="feature">
      <img class="image" :src="FeatureImage1" alt="feature image 1" />
      <div class="text right-text">
        <h2>Generate mind map with Neural Network</h2>
        <p>
          You can generate mind map from a Wikipedia article, or uploading a
          file. We are currently only support English content at the moment.
        </p>
      </div>
    </div>
    <div class="feature">
      <div class="text">
        <h2>Public API for connect with your own solution</h2>
        <p>
          We provide public API for individual to connect to our service and get
          your text transofrm into mind map. This enables endless possibilities
          for your own solutions of choices.
          <a class="link" href="https://github.com/cs-coeus/coeus-api"
            ><link-button>Explore our API documentation</link-button></a
          >
        </p>
      </div>
      <img class="image" :src="FeatureImage2" alt="feature image 2" />
    </div>

  </div>
</template>

<script lang="ts">

import FeatureImage1 from "../../assets/images/FeatureImage1.svg";
import FeatureImage2 from "../../assets/images/FeatureImage2.svg";
import LinkButton from '@/components/UI/LinkButton.vue';

export default {
  name: "FeaturesSection",
  components: {
    LinkButton
  },
  setup() {
    return {
      FeatureImage1,
      FeatureImage2,
    };
  },
};
</script>

<style scoped>
.feature-wrapper {
  margin-top: 48px;
  display: flex;
  flex-flow: column;
}

.feature {
  display: flex;
  flex-flow: row;
  align-items: center;
}

.feature .text,
.feature .image {
  flex: 1;
  margin-top: 16px;
}

.feature .text h2 {
  font-size: 3rem;
  margin-bottom: 48px;
}

.feature .text p {
  font-size: 1.125rem;
}

.feature .image {
  min-width: 300px;
  width: 50%;
  height: auto;
}

.feature .link {
  color: inherit;
}

@media only screen and (max-width: 986px) {
  .feature .text h2 {
    font-size: 1.5rem;
  }
}

@media only screen and (max-width: 768px) {
  .feature-wrapper {
    margin-top: 64px;
  }
  .feature {
    flex-flow: column;
  }

  .feature:nth-last-of-type(1) {
    flex-flow: column-reverse;
  }

  .feature .image {
    margin: 0 auto;
  }
}
</style>
