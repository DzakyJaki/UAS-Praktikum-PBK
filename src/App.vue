<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="wrapper">
    <nav>
      <RouterLink to="/">Stop Watch</RouterLink>
      <RouterLink to="/Weather">Weather</RouterLink>
      <RouterLink to="/Location">Location</RouterLink>
      <RouterLink to="/Photo">Photo</RouterLink>
      <RouterLink to="/Game">Mini Game</RouterLink>
    </nav>
  </div>
  <RouterView />
</template>

<script>
export default {
  methods: {
    Back() {
      this.$router.go(-1);
    },
    Forward() {
      this.$router.go(1);
    },
  },
};
</script>

<style scoped>
.btn-app {
  margin: 0 10px;
  padding: 10px;
  border: none;
  border-radius: 4px;
  bottom: 30px;
  right: 10px;
  width: 100px;
  cursor: pointer;
  transition: all ease 0.4ms;
  font-family: inherit;
  font-weight: 500;
  color: var(--color-text);
}

.btn-app:hover {
  background-color: antiquewhite;
}

header {
  background-color: aqua;
  place-items: center;
}

.wrapper {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
}

nav {
  font-size: 12px;
  margin-top: 2rem;
  display: flex;
  margin-left: -1rem;
  font-size: 1rem;
  padding: 1rem 0;
  margin-top: 1rem;
  margin-bottom: 50px;
  align-items: center;
}

nav a.router-link-exact-active {
  color: white;
}

nav a.router-link-exact-active::after {
  width: 100%;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  color: var(--color-text);
}

nav a:after {
  content: "";
  width: 0px;
  height: 2px;
  display: block;
  background: white;
  transition: 300ms;
}

nav a:first-of-type {
  border: 0;
}
</style>
