<template>
	<nav
		class="navigation-container"
		:class="{ 'toggle-background': scrollYPosition ?? 0 > 0 }"
	>
		<div class="left-container">
			<li class="navigation-item logo" @click="$emit('go-home')">COEUS</li>
		</div>
		<div class="right-container">
      <li class="navigation-item" v-if="!isHome"  @click="$emit('go-home')">Home</li>
			<li class="navigation-item" v-if="isHome"><a href="#hero-section">Services</a></li>
			<li class="navigation-item" v-if="isHome">
				<a href="#how-it-work-section">How It Works</a>
			</li>
			<li class="navigation-item" v-if="isHome"><a href="#about-us-section">About Us</a></li>
			<li class="navigation-item last">
				<a class="link" href="https://github.com/cs-coeus/coeus-api"
					><outline-button>Public API</outline-button></a
				>
			</li>
		</div>
	</nav>
	<nav
		class="mobile-menu"
		:class="{ 'toggle-background': scrollYPosition ?? 0 > 0 }"
	>
		<div class="left-container">
			<li class="navigation-item logo" @click="$emit('go-home')" >COEUS</li>
		</div>
		<div class="right-container">
			<hamburger-menu />
		</div>
	</nav>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue';
import HamburgerMenu from './HamburgerMenu.vue';
import OutlineButton from './OutlineButton.vue';

export default {
	name: 'NavBar',
  props: ['isHome'],
  emit: ['go-home'],
	components: {
		OutlineButton,
		HamburgerMenu,
	},
	setup() {
		const scrollYPosition = ref<number | null>(null);
		const updateScrollPosition = () => {
			scrollYPosition.value = window.scrollY;
		};

		onMounted(() => {
			window.addEventListener('scroll', updateScrollPosition);
		});

		return {
			scrollYPosition,
		};
	},
};
</script>

<style scoped>
.mobile-menu {
	display: none;
}

.navigation-container,
.left-container,
.right-container {
	display: flex;
	flex-flow: row;
	align-items: center;
}

.navigation-container {
	padding: 24px 96px;
	margin-left: -96px;
	justify-content: space-between;
	position: fixed;
	width: 100%;
	z-index: 1;
	transition: background 0.4s;
	transition: box-shadow 0.4s;
	isolation: isolate;
}

.navigation-container.toggle-background {
	background-color: var(--white);
	box-shadow: 0 8px 24px 0 var(--black-a15);
}

.navigation-item {
	font-size: 1.125rem;
	list-style-type: none;
	font-weight: bold;
}

.navigation-item a {
	text-decoration: none;
	color: var(--black);
}

.navigation-item.logo {
	font-size: 1.5rem;
}

.navigation-item .link {
	color: inherit;
	text-decoration: none;
}

.right-container .navigation-item {
	padding-right: 36px;
}

.right-container .navigation-item.last {
	padding-right: 0;
}

@media only screen and (max-width: 986px) {
	.navigation-container {
		display: none;
	}

	.mobile-menu {
		display: flex;
		width: 100%;
		justify-content: space-between;
		position: fixed;
		z-index: 1;
		padding: 16px 0;
		margin-left: -48px;
		padding-left: 48px;
		padding-right: 48px;
	}

	.mobile-menu.toggle-background {
		background-color: var(--white);
		box-shadow: 0 8px 24px 0 var(--black-a15);
	}
}
</style>
