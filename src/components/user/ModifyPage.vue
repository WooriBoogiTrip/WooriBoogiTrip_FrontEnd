<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const movePage = () => {
  router.push({ name: "home" });
};

const userinfo = { email: "이메일", nickname: "닉네임", phone: "연락처" };
</script>

<template>
  <form method="POST">
    <div class="mb-3">
      <label for="formGroupExampleInput" class="form-label">이메일</label>
      <input
        type="email"
        class="form-control"
        id="formGroupExampleInput"
        placeholder="이메일을 입력해주세요"
        name="email"
        :value="userinfo.email"
      />
    </div>
    <div class="mb-3">
      <label for="formGroupExampleInput2" class="form-label">닉네임</label>
      <input
        type="text"
        class="form-control"
        id="formGroupExampleInput2"
        placeholder="닉네임을 입력해주세요"
        name="nickname"
        :value="userinfo.nickname"
      />
    </div>
    <div class="mb-3">
      <label for="formGroupExampleInput2" class="form-label">연락처</label>
      <input
        type="tel"
        class="form-control"
        id="formGroupExampleInput2"
        placeholder="연락처를 입력해주세요"
        name="phone"
        :value="userinfo.phone"
      />
    </div>
    <div class="col-12">
      <button @click="movePage" type="button" class="btn btn-primary">정보 수정</button>
    </div>
  </form>
</template>

<style scoped>
.form-control {
  border: 2px solid #337CCF;
  border-radius: 4px;
}

.form-label {
  color: #1450A3;
}

.btn-primary {
  background-color: #337CCF;
  border: none;
}

form {
  max-width: 500px;
  margin: auto;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
