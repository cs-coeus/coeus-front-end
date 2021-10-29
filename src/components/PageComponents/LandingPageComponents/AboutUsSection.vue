<template>
  <div id="aboutus">
    <h1>About Us</h1>
    <div class="col">
      <div class="v13_47"></div>
      <h5 class="v13_49">Pittawat Taveekitworachai</h5>
      <p>Developer</p>
    </div>
    <div class="col">
      <div class="v15_2"></div>
      <h5>Wicharn Rueangkhajorn</h5>
      <p>Developer</p>
    </div>
    <div class="col">
      <div class="v13_46"></div>
      <h5>Michal Zielinski</h5>
      <p>Developer</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutUsSection'
}
</script>

<style scoped>
h1 {
  text-align: center;
}

.col {
  width: 33%;
  opacity: 1;
  top: 154px;
  overflow: hidden;
  float: left;
}
.col p {
  color: rgba(51,51,51,1);
  font-family: Helvetica;
  font-size: 18px;
  opacity: 1;
  text-align: center;
}

.col h5 {
  color: rgba(0,0,0,1);
  font-family: Helvetica;
  font-weight: Bold;
  font-size: 24px;
  opacity: 1;
  text-align: center;
  margin-bottom: 0;
}
.col div {
  margin-left: auto;
  margin-right: auto;
  min-height: 209px;
}

.v13_46 {
  width: 194px;
  height: 190px;
  background: url("../../../assets/images/v13_46.png") no-repeat center center;
  background-size: cover;
  opacity: 1;
  top: 0px;
  left: 0px;
  overflow: hidden;
}
.v15_2 {
  width: 227px;
  height: 209px;
  background: url("../../../assets/images/v15_2.png") no-repeat center center;
  background-size: cover;
  opacity: 1;
  top: 0px;
  left: 26px;
  overflow: hidden;
}
.v13_47 {
  width: 199px;
  height: 209px;
  background: url("../../../assets/images/v13_47.png") no-repeat center center;
  background-size: cover;
  opacity: 1;
  top: 0px;
  left: 49px;
  overflow: hidden;
}

@media only screen and (max-width: 1080px) {

}

@media only screen and (max-width: 798px) {
  .col {
    width: 100%;
  }
}


</style>
