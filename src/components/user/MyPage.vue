<script setup>
import { ref, onMounted } from "vue";
import { localaxios } from "../../api/authapi";
import { authorizationStore } from "../../stores/authorization.js";

const axios = localaxios();
const store = authorizationStore();
const myinfo = ref({ email: "", userId: "", userName: "" });

onMounted(() => {
  if (store.userData) {
    myinfo.value = { ...store.userData };
  } else {
    axios.get("/users/mypage", {
      headers: {
        Authorization: `Bearer ${store.authToken}`
      }
    }).then(({ data }) => {
      if (data) {
        myinfo.value.email = data.email;
        myinfo.value.userId = data.userId;
        myinfo.value.userName = data.userName;
      }
    }).catch(error => {
      console.error("Error fetching user info:", error);
    });
  }
});
</script>

<template>
  <div>
    <h1>My Page</h1>
    <p>Email: {{ myinfo.email }}</p>
    <p>User Name: {{ myinfo.userName }}</p>
    
  </div>
</template>

<style scoped></style>