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
const pwdAlert = ref('');

const checkEmail = () => {
  if (!email.value.includes('@')) {
    emailAlert.value = '@를 포함한 이메일 주소를 입력해주세요';
  } else {
    emailAlert.value = '';
  }
};

const checkPassword = () => {
  if (userPwd.value.length < 6) {
    pwdAlert.value = '비밀번호는 6글자 이상이어야 합니다';
  } else {
    pwdAlert.value = '';
  }
};

const register = () => {
  checkEmail();
  checkPassword();

  if (emailAlert.value || pwdAlert.value) {
    return; 
  }

  axios.post('/api/v1/users/join', {
    userId: userId.value,
    userName: userName.value,
    userPwd: userPwd.value,
    email: email.value
  }).then(response => {
    router.push('/');
  }).catch(error => {
    console.error(error);
  });
};
</script>

<template>
  <form method="POST">
    <div class="mb-3">
      <label for="userId" class="form-label">아이디</label>
      <input type="text" class="form-control" id="userId" v-model="userId" />
    </div>
    <div class="mb-3">
      <label for="userName" class="form-label">이름</label>
      <input type="text" class="form-control" id="userName" v-model="userName" />
    </div>
    <div class="mb-3">
      <label for="userPwd" class="form-label">비밀번호</label>
      <input type="password" class="form-control" id="userPwd" v-model="userPwd" />
      <p>{{ pwdAlert }}</p>
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

<style scoped>
.form-label {
  color: #1450A3;
}

.form-control {
  border: 2px solid #337CCF;
  border-radius: 4px;
}

.btn-primary {
  background-color: #337CCF;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #1450A3;
}

p {
  color: red;
}

form {
  max-width: 500px;
  margin: auto;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
