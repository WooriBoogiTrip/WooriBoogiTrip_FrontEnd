<script setup>
import { ref } from "vue";
import { localaxios } from "../../api/authapi";
const axios = localaxios();
const myinfo = ref({
  email: "",
  name: "",
  nickname: "",
  phone: "",
});
axios.get("/user").then(({ data }) => {
  if (data.success === true) {
    myinfo.value.email = data.email;
    myinfo.value.name = data.name;
    myinfo.value.nickname = data.nickname;
    myinfo.value.phone = data.phone;
  }
});
</script>

<template>
  <p>즐겨찾기한 여행계획, 관광지 정보 출력</p>
  <p>이메일 : {{ myinfo.email }}</p>
  <p>이름 : {{ myinfo.name }}</p>
  <p>닉네임 : {{ myinfo.nickname }}</p>
  <p>연락처 : {{ myinfo.phone }}</p>
</template>

<style scoped></style>
