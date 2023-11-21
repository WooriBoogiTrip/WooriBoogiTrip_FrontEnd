<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { localaxios } from "../../api/authapi";
import { authorizationStore } from "../../stores/authorization.js";
const store = authorizationStore();
const axios = localaxios();
const router = useRouter();
const userId = ref('');
const userPwd = ref('');
const errorMessage = ref('');

const login = () => {
  let formData = new FormData();
  formData.append("userid", userId.value);
  formData.append("userpwd", userPwd.value);

  axios.post("/api/v1/users/login", formData)
    .then(({ data }) => {
      if (data) {
        store.isLoggedIn = true;
        store.userData = data;
        router.push({ name: "home" });
      }
    }).catch(error => {
      if (error.response && error.response.status === 401) {
        errorMessage.value = '아이디나 비밀번호가 일치하지 않습니다';
      } else {
        errorMessage.value = '로그인 중 오류가 발생했습니다';
      }
    });
};


</script>

<template>
  <form method="POST">
    <div class="mb-3">
      <label for="userIdInput" class="form-label">사용자 ID</label>
      <input
        type="text"
        class="form-control"
        id="userIdInput"
        placeholder="사용자 ID를 입력해주세요"
        v-model="userId"
      />
    </div>
    <div class="mb-3">
      <label for="userPwdInput" class="form-label">비밀번호</label>
      <input
        type="password"
        class="form-control"
        id="userPwdInput"
        placeholder="비밀번호를 입력해주세요"
        v-model="userPwd"
      />
    </div>
    <div v-if="errorMessage" class="alert alert-danger">
      {{ errorMessage }}
    </div>
    <div class="col-12">
      <button @click="login" type="button" class="btn btn-primary">로그인</button>
    </div>
  </form>

</template>

<style scoped></style>
