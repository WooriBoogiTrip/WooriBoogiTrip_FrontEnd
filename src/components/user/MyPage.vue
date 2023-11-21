<script setup>
import { ref } from "vue";
import { localaxios } from "../../api/authapi";
const axios = localaxios();
const myinfo = ref({
  email: "",
  userId: "",
  userName: "",
});

axios.get("/users/mypage").then(({ data }) => {
  if (data) {
    myinfo.value.email = data.email;
    myinfo.value.userId = data.userId;
    myinfo.value.userName = data.userName;
  }
});
</script>

<template>
  <p>즐겨찾기한 여행계획, 관광지 정보 출력</p>
  <p>이메일 : {{ myinfo.email }}</p>
  <p>사용자 ID : {{ myinfo.userId }}</p>
  <p>사용자 이름 : {{ myinfo.userName }}</p>
</template>

<style scoped></style>

