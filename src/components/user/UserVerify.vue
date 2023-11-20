<script setup>
import { useRoute, useRouter } from "vue-router";
import { authorizationStore } from "@/stores/authorization.js";
import { localaxios } from "../../api/authapi";
const axios = localaxios();

const route = useRoute();
const router = useRouter();
const token = route.query.token;
const store = authorizationStore();

axios.get("/user/verify", { params: { token: token } }).then(({ data }) => {
  if (data.success === true) {
    console.log(data.accessToken);
    store.change(data.accessToken);
    router.push({ name: "home" });
  }
});
</script>

<template>
  <h2>로그인 or 회원가입시 이메일에서 받아온 인증 정보를 서버로 전송하는 페이지</h2>
  <h5>토큰 : {{ token }}</h5>
  <p>저장값 : {{ store.value }}</p>
</template>

<style scoped></style>
