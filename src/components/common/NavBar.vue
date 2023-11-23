<script setup>
import { useRouter } from "vue-router";
import { authorizationStore } from "../../stores/authorization.js";
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

const logout = () => {
  store.isLoggedIn = false;
};
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-lgiht">
    <div class="container-fluid">
      <a class="navbar-brand" style='color: #337CCF' @click="home" href="#">우리부기트립</a>
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
            <a class="nav-link" href="#">공지사항</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="attraction" href="#">관광지</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="plan" href="#">여행계획</a>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'board' }" class="nav-link">자유게시판</router-link>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              여행지도
            </a>
            <ul class="dropdown-menu">
              <li><router-link :to="{ name: 'estations' }" class="dropdown-item">전기차충전소</router-link></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#">추가할 지도</a></li>
            </ul>
          </li>
        </ul>
        <div class="justify-content-end">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <template v-if="!store.isLoggedIn">
              <li class="nav-item">
                <router-link :to="{ name: 'login' }" class="nav-link">로그인</router-link>
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
                <a href="#" class="nav-link" @click="logout">로그아웃</a>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
  .nav-link{
    font-family: 'basic-B';
  }

  .navbar-brand{
    font-family: 'main';
    font-size: 26px;
  }

  .collapse navbar-collapse{
    height: 64px;
  }

  .nav-item{
    align-self: center;
  }
</style>
