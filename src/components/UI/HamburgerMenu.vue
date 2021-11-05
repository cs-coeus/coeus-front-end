<template>
  <button @click="onOpenMobileMenu" class="hamburger-menu">
    <div class="hamburger-line"></div>
    <div class="hamburger-line"></div>
    <div class="hamburger-line"></div>
  </button>
  <div class="menu-drawer" :class="{ open: isDrawerOpen }">
    <h1 class="title">COEUS</h1>
    <ul class="list-item-container">
      <li class="list-item">
        <a @click="onCloseMobileMenu" href="#hero-section"> Service </a>
      </li>
      <li class="list-item">
        <a @click="onCloseMobileMenu" href="#how-it-work-section">
          How It Works
        </a>
      </li>
      <li class="list-item">
        <a @click="onCloseMobileMenu" href="#about-us-section"> About Us </a>
      </li>
      <li class="list-item">
        <a href="https://github.com/cs-coeus/coeus-api">
          <outline-button>Public API</outline-button>
        </a>
      </li>
    </ul>
    <button class="close-button" @click="onCloseMobileMenu">
      <div class="cross-line-left"></div>
      <div class="cross-line-right"></div>
    </button>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import OutlineButton from "./OutlineButton.vue";

export default {
  name: "HamburgerMenu",
  components: {
    OutlineButton,
  },
  setup() {
    const scrollYPosition = ref<number | null>(null);
    const isDisplayMenu = ref<boolean | null>(null);
    const isDrawerOpen = ref(false);

    const onOpenMobileMenu = () => {
      isDrawerOpen.value = true;
    };

    const onCloseMobileMenu = () => {
      isDrawerOpen.value = false;
    };

    const updateScrollPosition = () => {
      scrollYPosition.value = window.scrollY;
    };

    onMounted(() => {
      window.addEventListener("scroll", updateScrollPosition);
    });

    return {
      scrollYPosition,
      isDisplayMenu,
      isDrawerOpen,
      onOpenMobileMenu,
      onCloseMobileMenu,
    };
  },
};
</script>

<style scoped>
.title {
  font-size: 2.5rem;
  margin-bottom: 36px;
}

.hamburger-menu {
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  display: flex;
  flex-flow: column;
  width: 32px;
  height: 32px;
}

.hamburger-menu .hamburger-line {
  width: 100%;
  border: 2px solid var(--black);
  margin-top: 4px;
}

.menu-drawer {
  display: flex;
  position: absolute;
  top: -1200%;
  left: 0;
  width: 100%;
  height: 100vh;
  isolation: isolate;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  transition: all 0.6s ease-in-out;
  background-color: var(--primary-color);
  color: var(--white);
  isolation: isolate;
  font-size: 1.5rem;
}

.menu-drawer.open {
  top: 0;
}

.menu-drawer .list-item-container {
  padding: 0;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: center;
  height: 45%;
  max-height: 300px;
}

.menu-drawer .list-item {
  width: max-content;
  list-style-type: none;
  border-bottom: 2px solid var(--primary-color);
}

.menu-drawer .list-item:hover {
  border-bottom-color: var(--white);
}

.menu-drawer .list-item:last-of-type:hover {
  border-bottom-color: var(--primary-color);
}

.menu-drawer .close-button {
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  margin-top: 32px;
  position: relative;
  width: 32px;
  height: 32px;
  transition: transform 0.3s ease-in-out;
}

.menu-drawer .close-button:hover {
  transform: translate(0, -4px);
}

.menu-drawer .close-button .cross-line-left {
  position: absolute;
  margin: 0 auto;
  width: 100%;
  height: 2px;
  background-color: var(--white);
  transform: rotate(45deg);
}

.menu-drawer .close-button .cross-line-right {
  position: absolute;
  margin: 0 auto;
  width: 100%;
  height: 2px;
  background-color: var(--white);
  transform: rotate(-45deg);
}

.menu-drawer a {
  text-decoration: none;
  color: var(--white);
}

.menu-drawer .outline-button {
  font-weight: bold;
  color: var(--white);
  border: 3px solid var(--white);
}

.menu-drawer .outline-button:hover {
  color: var(--primary-color);
  background-color: var(--white);
}
</style>
