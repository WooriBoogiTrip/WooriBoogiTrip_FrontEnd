<script setup>
import { RouterView } from "vue-router";
import NavBar from "./components/common/NavBar.vue";
import VFooter from "./components/common/VFooter.vue";
</script>

<template>
  <NavBar />
  <RouterView />
  <VFooter />
</template>

<style scoped></style>
