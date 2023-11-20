<script setup>
import { useRoute, useRouter } from "vue-router";
import { authorizationStore } from "@/stores/authorization.js";
import { localaxios } from "../../api/authapi";
const axios = localaxios();
const route = useRoute();
const router = useRouter();
const platform = route.params.platform;
const code = route.query.code;
const state = route.query.state;
const store = authorizationStore();
console.log(code);
console.log(state);
console.log(platform);
// 여기서 code와 state를 넘겨주고

axios
  .get(`/user/login/${platform}`, { params: { code: code, state: state } })
  .then(({ data }) => {
    if (data.success === true) {
      store.change(data.accessToken);
      router.push({ name: "home" });
    }
  })
  .catch((data) => {
    router.push({
      name: "usersignup",
      query: { email: data.email },
    });
  });
</script>

<template>
  <h2>플랫폼 로그인 or 회원가입시 이메일에서 받아온 인증 정보를 서버로 전송하는 페이지</h2>
  <h5>토큰 : {{ token }}</h5>
  <p>저장값 : {{ store.value }}</p>
</template>

<style scoped></style>
