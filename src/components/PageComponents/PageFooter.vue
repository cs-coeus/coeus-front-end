<template>
  <div class="footer">
    <span class="v13_58 left">COEUS</span><span class="v13_61 right">All rights reserved. This project is a part of computer science capstone project
            at School of Information Technology, King Mongkut’s University of Technology Thonburi</span>
  </div>
</template>

<script>
export default {
  name: 'PageFooter'
}
</script>

<style scoped>
.footer {
  width: 100%;
  height: 120px;
  opacity: 1;
  position: relative;
  background: rgba(235,246,255,1);
}

.left {
  width: 20%;
  top: 44px;
  float: left;
}
.right {
  width: 60%;
  top: 44px;
  float:right;
}

.v13_58 {

  color: rgba(0,0,0,1);
  position: relative;
  left: 128px;
  font-family: Helvetica;
  font-weight: Bold;
  font-size: 24px;
  opacity: 1;
  text-align: left;
}
.v13_61 {
  color: rgba(51,51,51,1);
  position: relative;
  font-family: Helvetica;
  font-size: 16px;
  opacity: 1;
  text-align: right;
  margin-right: 2%;
}

@media only screen and (max-width: 798px) {
  .left {
    width: 100%;
    display: none;
  }
  .right {
    top:20%;
    width: 90%;
    margin-right: 5%;
    margin-left: 5%;
    text-align: center;
  }
}
</style>
