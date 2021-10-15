<template>
    <div id="services">
      <div class="left short"><img class="img"  src="../../../assets/images/v5_6.png"></div>
      <div class="right pr0 pt1"><h1>Generate mind map
        with Neural Network</h1><p>You can generate mind map from a Wikipedia article, or uploading
                  a file. We are currently only support English content at the moment.</p>
      </div>
    </div>
    <div id="publicapi">
      <div class="left pl1 pt1"><h1>Public API for connect
        with your own solution</h1><p>We provide public API for individual to connect to our service and get your
        text transform into mind map. This enables endless possibilities for your  own solutions of choices. Explore our API documentation</p>
      </div>
      <div class="right short"><img class="img" src="../../../assets/images/v5_13.png" alt="Public Api"></div>
    </div>
</template>

<script>
export default {
  name: 'ServicesAndPublicApiSection'
}
</script>

<style scoped>
.left {
  width: 50%;
  height: 70vh;
  top:0;
  float: left;
}
.right {
  width: 50%;
  height: 70vh;
  top:0;
  float:right;
}
.img {
  max-height:528px;
}

@media only screen and (max-width: 798px) {
  .short {
    height: 25vh;
  }

  .left {
    width: 100%;
  }
  .right {
    width: 100%;
  }

  .pt1 {
    top:2%;
  }

  .img {
    max-height:828px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
  }

}
</style>
