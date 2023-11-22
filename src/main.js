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



app.use(createPinia());
app.use(router);
app.component("infinite-loading", InfiniteLoading.default);

app.mount("#app");
