<script setup>
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { localaxios } from "../../api/authapi";
const axios = localaxios();
const router = useRouter();
const email = ref();
onMounted(() => {
  const jquery = document.createElement("script");
  jquery.src = "https://code.jquery.com/jquery-1.11.3.min.js";
  document.head.appendChild(jquery);
  const naver = document.createElement("script");
  /* global naver_id_login */
  naver.src = "https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js";
  naver.charset = "utf-8";
  naver.onload = () => {
    var naver_id_logins = new naver_id_login(
      "bsL2S_DGkMXWmZZQhC9E",
      "https://enjoytrip.site/user/login/naver",
    );
    var state = naver_id_logins.getUniqState();
    naver_id_logins.setButton("white", 2, 40);
    naver_id_logins.setDomain("YOUR_SERVICE_URL");
    naver_id_logins.setState(state);
    naver_id_logins.response_type = "code";
    naver_id_logins.init_naver_id_login();
  };
  document.head.appendChild(naver);

  const kakao = document.createElement("script");
  kakao.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.5.0/kakao.min.js";
  kakao.integrity = "sha384-kYPsUbBPlktXsY6/oNHSUDZoTX6+YI51f63jCPEIPFP09ttByAdxd2mEjKuhdqn4";
  kakao.crossOrigin = "anonymous";
  kakao.onload = () => {
    /* global Kakao */
    Kakao.init("4cb8ef88bda197192e5c05f32b0bd122"); // 사용하려는 앱의 JavaScript 키 입력
  };
  document.head.appendChild(kakao);
});

const login = () => {
  axios.post("/user/signin", { email: email.value }).then(({ data }) => {
    if (data.success === true) {
      router.push({ name: "usersignupresult" });
    }
  });
};

const doGoogleLogin = () => {
  const clientID = "617798581810-gudo54ndeqkrkh5g5u8sj25092eucd52.apps.googleusercontent.com";
  const clientSecret = "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";
  const googleRedirecURL = "https://enjoytrip.site/user/login/google";
  const url =
    "https://accounts.google.com/o/oauth2/v2/auth?client_id=" +
    clientID +
    "&redirect_uri=" +
    googleRedirecURL +
    "&response_type=code" +
    "&scope=email profile";
  window.location.href = url;
};

function loginWithKakao() {
  Kakao.Auth.authorize({
    redirectUri: "https://enjoytrip.site/user/login/kakao",
  });
}
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
        v-model="email"
      />
    </div>
    <div class="col-12">
      <button @click="login" type="button" class="btn btn-primary">로그인</button>
    </div>
  </form>

  <div><button @click="doGoogleLogin">구글 로그인</button></div>
  <div id="naver_id_login"></div>

  <a id="kakao-login-btn" @click="loginWithKakao">
    <img
      src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
      width="222"
      alt="카카오 로그인 버튼"
    />
  </a>
  <div id="naver_id_login"></div>
  <p id="token-result"></p>
</template>

<style scoped></style>
