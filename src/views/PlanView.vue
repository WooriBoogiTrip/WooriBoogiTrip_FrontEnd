<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const list = () => {
  router.push({ name: "planlist" });
};
const detail = () => {
  router.push({ name: "planInfo", params: { id: "1" } });
};
</script>

<template>
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item"><a href="#" class="nav-link" @click="list">리스트</a></li>
        <li class="nav-item"><a href="#" class="nav-link" @click="detail">디테일</a></li>
      </ul>
    </header>
  </div>
  <RouterView />
</template>

<style scoped></style>
