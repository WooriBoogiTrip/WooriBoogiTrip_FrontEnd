<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { localaxios } from "../../api/authapi";

const axios = localaxios();
const router = useRouter();

const userId = ref('');
const userName = ref('');
const userPwd = ref('');
const email = ref('');
const emailAlert = ref('');

// 이메일 중복 검사
const checkEmail = () => {
  // 이메일 중복 검사 로직 구현
};

// 회원가입 요청
const register = () => {
  axios.post('/api/v1/users/join', {
    userId: userId.value,
    userName: userName.value,
    userPwd: userPwd.value,
    email: email.value
  }).then(response => {
    // 회원가입 성공 처리
    router.push('/');
  }).catch(error => {
    // 에러 처리
    console.error(error);
  });
};

// 여기에 필요한 다른 유효성 검사 함수들을 추가
</script>

<template>
  <form method="POST">
    <div class="mb-3">
      <label for="userId" class="form-label">사용자 ID</label>
      <input type="text" class="form-control" id="userId" v-model="userId" />
    </div>
    <div class="mb-3">
      <label for="userName" class="form-label">이름</label>
      <input type="text" class="form-control" id="userName" v-model="userName" />
    </div>
    <div class="mb-3">
      <label for="userPwd" class="form-label">비밀번호</label>
      <input type="password" class="form-control" id="userPwd" v-model="userPwd" />
    </div>
    <div class="mb-3">
      <label for="email" class="form-label">이메일</label>
      <input type="email" class="form-control" id="email" v-model="email" @blur="checkEmail" />
      <p>{{ emailAlert }}</p>
    </div>
    <div class="col-12">
      <button @click="register" type="button" class="btn btn-primary">회원가입</button>
    </div>
  </form>
</template>

<style scoped></style>
