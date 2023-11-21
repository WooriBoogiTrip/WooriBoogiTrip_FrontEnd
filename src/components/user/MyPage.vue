<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { localaxios } from "../../api/authapi";
import { authorizationStore } from "../../stores/authorization.js";

const router = useRouter();
const store = authorizationStore();
const axios = localaxios();
const email = ref('');
const myinfo = ref({ email: "", userId: "", userName: "" });
const userProfile = ref({ email: "", userId: "", userName: "" });

onMounted(() => {
  if (store.userData) {
    userProfile.value = { ...store.userData };
    myinfo.value = { ...store.userData };
  } else {
    fetchUserInfo();
  }
});

const fetchUserInfo = () => {
  axios.get("/users/mypage", {
    headers: {
      Authorization: `Bearer ${store.authToken}`
    }
  }).then(({ data }) => {
    if (data) {
      userProfile.value = {
        email: data.email,
        userId: data.userId,
        userName: data.userName
      };
      myinfo.value = { ...userProfile.value };
    }
  }).catch(error => {
    console.error("사용자 정보 가져오기 오류:", error);
  });
};

const updateProfile = () => {
  axios.put('/api/v1/users/update', userProfile.value, {
    headers: {
      Authorization: `Bearer ${store.authToken}`
    }
  }).then(response => {
    console.log('프로필 업데이트:', response.data);
    myinfo.value = { ...response.data };

    console.log(myinfo.value);
    console.log(response.data);
    store.userData.userName = userProfile.value.userName;
    store.userData.email = userProfile.value.email;
    router.push({ name: 'home' });
  })
  .catch(error => {
    console.error('프로필 업데이트 오류:', error);
  });
};

const findPassword = () => {
  let formData = new FormData();
  formData.append("email", email.value);
  axios.post('/api/v1/users/find-password', formData)
  .then(() => {
    alert("임시 비밀번호가 이메일로 전송되었습니다.");
  })
  .catch(error => {
    console.error(error);
    alert("비밀번호 재발급 요청에 실패했습니다.");
  });
};

</script>


<template>
  <div>
    <h1>My Page</h1>
    <p>이메일 : {{ userProfile.email }}</p>
    <p>이름 : {{ userProfile.userName }}</p>
  </div>
  <div>
    <h2>마이페이지 - 프로필 수정</h2>
    <form @submit.prevent="updateProfile">
      <div class="mb-3">
        <label for="email" class="form-label">이메일</label>
        <input type="email" class="form-control" id="email" v-model="userProfile.email" />
      </div>
      <div class="mb-3">
        <label for="userName" class="form-label">사용자 이름</label>
        <input type="text" class="form-control" id="userName" v-model="userProfile.userName" />
      </div>
      <button type="submit" class="btn btn-primary">업데이트</button>
      <button @click="findPassword">비밀번호 재발급</button>
    </form>
  </div>
</template>


<style scoped></style>