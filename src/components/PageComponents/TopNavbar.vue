<template>
  <section class="navigation">
    <div class="nav-container">
      <div class="brand">
        <a @click="home">COEUS</a>
      </div>
      <nav>
        <div class="nav-mobile" @click="toggleBurger"><a id="nav-toggle"  :class="{active: burger}" href="#!"><span></span></a></div>
        <ul class="nav-list" :class="{'nav-mobile-activated': burger}">
          <li v-if="!isHome">
            <a @click="home" >Home</a>
          </li>
          <li v-if="isHome">
            <a href="#aboutus">About Us</a>
          </li>
          <li v-if="isHome">
            <a href="#howItWorks">How it works</a>
          </li>
          <li v-if="isHome">
            <a href="#services" >Services</a>
          </li>
          <li class="public">
            <a href="#publicapi" @click="home">Public API</a>
          </li>
        </ul>
      </nav>
    </div>
  </section>
</template>

<script>

export default {
  name: 'TopNavbar',
  props: ['isHome'],
  data() {
    return {
      burger: false,
    }
  },
  methods: {
    home() {
      this.$emit('go-home');
    },
    toggleBurger() {
      this.burger = !this.burger;
    }
  }
}
</script>

<style scoped lang="scss">
$content-width: 100vw;
$breakpoint: 799px;
$nav-height: 70px;
$nav-background: rgba(235,246,255,1);
$nav-font-color: rgba(0,0,0,1);

  .public {
    border: 4px solid rgba(22,135,167,1);
    border-radius:60px;
  }

   .navigation {
     height: $nav-height;
     position: fixed;
     top: 48px;
     width: $content-width;
     z-index: 99;
     padding-right: 8%;
     padding-left: 8%;
   }

   .brand {
     position: absolute;
     float: left;
     line-height: $nav-height;
     text-transform: uppercase;
     font-size: 1.4em;
     font-family: Helvetica,sans-serif;
     font-weight: Bold;
a,
a:visited {
  color: $nav-font-color;
  text-decoration: none;
}
}

   .nav-container {
     max-width: $content-width;
     margin: 0 auto;
   }

   nav {
     float: right;

ul {
  list-style: none;
  margin: 0;
  padding: 0;
li {
  float: left;
  position: relative;
a,
a:visited {
  display: block;
  padding: 0 20px;
  line-height: $nav-height;
  font-family: Helvetica,serif;
  font-weight: Bold;
  font-size: 18px;
  color: $nav-font-color;
  text-decoration: none;

&:not(:only-child):after {
   padding-left: 4px;
   content: ' ▾';
 }
}
     ul li {
       min-width: 190px;
a {
  padding: 15px;
  line-height: 20px;
}
}
}
}
}

   .nav-dropdown {
     position: absolute;
     display: none;
     z-index: 1;
     box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
   }

/* Mobile navigation */

   .nav-mobile {
     display: none;
     position: absolute;
     top: 0;
     right: 0;

     height: $nav-height;
     width: $nav-height;
   }
   .nav-mobile-activated {
     display: inline;
     background-color: $nav-background;
   }
@media only screen and (max-width: 798px) {

.nav-mobile {
  display: block;
}
  nav {
    width: 100%;
    padding: $nav-height 0 15px;
  ul {
    display: none;
    background-color: $nav-background;
  li {
    float: none;
    background-color: $nav-background;
  a {
    padding: 15px;
    line-height: 20px;
  }
  ul li a {
    padding-left: 30px;
  }
}
}
}
.nav-dropdown {
  position: static;
}
}
@media screen and (min-width: $breakpoint) {
  .nav-list {
    display: block !important;

  }
}
#nav-toggle {
  position: absolute;
  left: 18px;
  top: 22px;
  cursor: pointer;
  padding: 10px 35px 16px 0px;
span,
span:before,
span:after {
  cursor: pointer;
  border-radius: 1px;
  height: 5px;
  width: 35px;
  background: $nav-font-color;
  position: absolute;
  display: block;
  content: '';
  transition: all 300ms ease-in-out;
}
span:before {
  top: -10px;
}
span:after {
  bottom: -10px;
}
&.active span {
   background-color: transparent;
&:before,
&:after {
   top: 0;
 }
&:before {
   transform: rotate(45deg);
 }
&:after {
   transform: rotate(-45deg);
 }
}
}

</style>
