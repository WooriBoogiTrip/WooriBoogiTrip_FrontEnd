<script setup>
import { useRouter } from "vue-router";
import { authorizationStore } from "@/stores/authorization.js";
const store = authorizationStore();

const router = useRouter();
const home = () => {
  router.push({ name: "home" });
};
const attraction = () => {
  router.push({ name: "attraction" });
};
const plan = () => {
  router.push({ name: "plan" });
};
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" @click="home" href="#">EnjoyTrip</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" @click="home" href="#">home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="attraction" href="#">attraction</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="plan" href="#">plan</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/map">map</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/drag">드래그 테스트</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/search">검색 테스트</a>
          </li>
        </ul>
        <div class="justify-content-end">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <template v-if="store.Authorization == ''">
              <li class="nav-item">
                <router-link :to="{ name: 'login' }" class="nav-link">로그인</router-link>&nbsp;
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'usersignup' }" class="nav-link">회원가입</router-link>
              </li>
            </template>
            <template v-else>
              <li class="nav-item">
                <router-link :to="{ name: 'mypage' }" class="nav-link">마이페이지</router-link>
              </li>
              <li class="nav-item">
                <a hre="#" class="nav-link" @click="store.Authorization = ''">로그아웃</a>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
