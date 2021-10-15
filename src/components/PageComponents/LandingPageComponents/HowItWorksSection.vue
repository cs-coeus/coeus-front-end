<template>
  <div>
    <h1>How it works</h1>
    <p>How your text transform into mind map</p>
    <div class="steps">
      <div class="v13_24"></div>
      <div class="box step1">
        <h3>Step 1</h3>
        <p>Extract text from a file or a Wikipedia article.</p>
      </div>

      <div class="box step2">
        <h3>Step 2</h3>
        <p>Feed raw text data to model for analyze the structure and important keywords.</p>
      </div>

      <div class="box step3">
        <h3>Step 3</h3>
        <p>Convert results from model into data structure applicable for mind map visualization.</p>
      </div>

      <div class="box step4">
        <h3>Step 4</h3>
        <p>Read mind map data and display the corresponding mind map.</p>
      </div>
      <div class="v13_25" id="howItWorks"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HowItWorksSection'
}
</script>

<style scoped>

 h1 {
   text-align: center;
 }
 p {
   text-align: center;
 }
 .box {
   width: 300px;
   height: 200px;
   opacity: 1;
   position: relative;
   border-radius: 20px;
   background: rgba(255, 255, 255, 1) no-repeat center center;
   box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15000000596046448);
   font-family: Helvetica;
 }

 .box h3 {
   width: 109px;
   color: rgba(22,135,167,1);
   position: relative;
   top: 32px;
   left: 32px;
   font-weight: Bold;
   font-size: 36px;
   opacity: 1;
   text-align: left;
 }

 .box p {
   width: 236px;
   color: rgba(51,51,51,1);
   position: relative;
   top: 25px;
   left: 32px;
   font-size: 18px;
   text-align: left;
 }

 .step1 {
   left: 5%;
   z-index: 10;
 }

 .step2 {
   top:-90px;
   left: 50%;
   z-index: 10;
 }

 .step3 {
   top:-10px;
   left: 65%;
   z-index: 10;
 }

 .step4 {
   top: -220px;
   left: 10%;
   z-index: 10;
 }

 .steps{
   margin-top: -35%;
   margin-bottom: -45%;
 }

 .v13_24 {
   width: 537px;
   height: 475px;
   background: url("../../../assets/images/v13_24.png") no-repeat center center;
   background-size: cover;
   opacity: 1;
   position: relative;
   top: 750px;
   left: 1%;
 }
 .v13_25 {
   width: 488px;
   height: 488px;
   background: url("../../../assets/images/v13_25.png") no-repeat center center;
   background-size: cover;
   opacity: 1;
   position: relative;
   top: -820px;
   left: 61%;
 }

 @media only screen and (max-width: 798px) {
   .step1,.step2,.step3, .step4 {
     top:2%;
     left:0;
     display: block;
     margin-left: auto;
     margin-right: auto;
     width: 50%;
   }
   .v13_25, .v13_24 {
     display: none;
   }
   .box {
     width: 90%;
   }
   .steps {
     margin-top: 0;
     margin-bottom: 0;
   }
 }

</style>
