import { createApp } from "vue";
import { createPinia } from "pinia";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";


import App from "./App.vue";
import router from "./router";
import "@/assets/css/fonts.css"

const app = createApp(App);

const kakaoMapsKey = import.meta.env.VITE_KAKAO_MAP_SERVICE_KEY;

const script = document.createElement('script');
script.type = 'text/javascript';
script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapsKey}`;
document.head.appendChild(script);


app.use(createPinia());
app.use(router);
app.component("infinite-loading", InfiniteLoading.default);

app.mount("#app");
