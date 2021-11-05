<template>
  <div class="footer-wrapper">
    <div class="left-container">
      <p>COEUS</p>
    </div>
    <div class="right-container">
      <p>
        All rights reserved. This project is a part of computer science capstone
        project at School of Information Technology, King Mongkut’s University
        of Technology Thonburi
      </p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "FooterSection",
};
</script>

<style scoped>
.footer-wrapper {
  margin: 0 -96px;
  margin-top: 64px;
  padding: 32px 96px;
  background-color: var(--background-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-wrapper .left-container {
  font-size: 1.5rem;
  font-weight: bold;
}

.footer-wrapper .right-container {
  width: 70%;
  text-align: right;
}

@media only screen and (max-width: 986px) {
  .footer-wrapper {
    flex-flow: column;
  }

  .footer-wrapper .right-container {
    margin-top: 32px;
    width: 100%;
    text-align: center;
  }
}
</style>
