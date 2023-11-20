<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { localaxios } from "../../api/authapi";
const axios = localaxios();
const router = useRouter();
const route = useRoute();

const regist = () => {
  axios
    .post("/user/signup", {
      email: email.value,
      name: name.value,
      nickname: nickname.value,
      phone: phone.value,
    })
    .then(({ data }) => {
      if (data.success === true) {
        router.push({ name: "usersignupresult" });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

// /^[가-힣a-zA-Z]+$/ 한글, 영어 이름, 닉네임
// /^[0-9]{8,13}$/ 전화번호 - 빠진 상태
const namecheck = /^[가-힣a-zA-Z]+$/;
const phonecheck = /^[0-9]{8,13}$/;

const email = ref("");
const name = ref("");
const nickname = ref("");
const phone = ref("");

const emailalert = ref("");
const namealert = ref("");
const nicknamealert = ref("");
const phonealert = ref("");

const emailok = ref(false);
const nameok = ref(false);
const nicknameok = ref(false);
const phoneok = ref(false);

const emailcheck = () => {
  axios.get("/user/email", { params: { email: email.value } }).then(({ data }) => {
    if (data.success === false) {
      emailalert.value = "사용 불가능";
      emailok.value = false;
    } else {
      emailalert.value = "사용 가능";
      emailok.value = true;
    }
  });
};

if (route.query.email) {
  // 있으면 이메일 박아버리고 리드온리로 설정
  // 없으면 평소
  email.value = route.query.email;
  emailcheck();
  //여기서 invalid 하면 email 값 null 로 세팅해버리셈
  //readonly 빼버리고
  if (emailok.value === false) {
    route.query.email = undefined;
  }
}

const namechecking = () => {
  if (namecheck.test(name.value)) {
    namealert.value = "사용 가능";
    nameok.value = true;
  } else {
    namealert.value = "사용 불가능";
    nameok.value = false;
  }
};
const nicknamechecking = () => {
  if (namecheck.test(nickname.value)) {
    nicknamealert.value = "사용 가능";
    nicknameok.value = true;
  } else {
    nicknamealert.value = "사용 불가능";
    nicknameok.value = false;
  }
};
const phonechecking = () => {
  if (phonecheck.test(phone.value)) {
    phonealert.value = "사용 가능";
    phoneok.value = true;
  } else {
    phonealert.value = "사용 불가능";
    phoneok.value = false;
  }
};

// 이제 이메일 형식이 맞는지, 전화번호 형식이 맞는지를 확인해주자
</script>

<template>
  <form method="POST">
    <div class="mb-3">
      <label for="email" class="form-label">이메일</label>
      <input
        type="email"
        class="form-control"
        id="email"
        placeholder="이메일을 입력해주세요"
        name="email"
        v-model="email"
        @blur="emailcheck"
        :readonly="route.query.email"
      />
      <p>{{ emailalert }}</p>
    </div>
    <div class="mb-3">
      <label for="name" class="form-label">이름</label>
      <input
        type="text"
        class="form-control"
        id="name"
        placeholder="이름을 입력해주세요"
        name="name"
        v-model="name"
        @blur="namechecking"
      />
      <p>{{ namealert }}</p>
    </div>
    <div class="mb-3">
      <label for="nickname" class="form-label">닉네임</label>
      <input
        type="text"
        class="form-control"
        id="nickname"
        placeholder="닉네임을 입력해주세요"
        name="nickname"
        v-model="nickname"
        @blur="nicknamechecking"
      />
      <p>{{ nicknamealert }}</p>
    </div>
    <div class="mb-3">
      <label for="phone" class="form-label">연락처</label>
      <input
        type="tel"
        class="form-control"
        id="phone"
        placeholder="연락처를 입력해주세요"
        name="phone"
        v-model="phone"
        @blur="phonechecking"
      />
      <p>{{ phonealert }}</p>
    </div>
    <div class="col-12">
      <button @click="regist" type="button" class="btn btn-primary">회원 가입</button>
    </div>
  </form>
</template>

<style scoped></style>
