<script setup>
import ShowMap from "../map/ShowMap.vue";
import PlanDetailList from "./PlanDetailList.vue";
import { useRoute } from "vue-router";
import { localaxios } from "../../api/authapi";
import { ref } from "vue";
const axios = localaxios();
const route = useRoute();
const list = ref([]);
const planinfo = ref({
  nickname: "",
  title: "",
  content: "",
  up: "",
  down: "",
  favorite: "",
});
console.log(route.params.id);
axios.get(`/plan/${route.params.id}`).then(({ data }) => {
  if (data.success === true) {
    list.value = data.data.attractions;
    planinfo.value.nickname = data.data.writer.nickname;
    planinfo.value.title = data.data.title;
    planinfo.value.content = data.data.content;
    planinfo.value.up = data.data.up;
    planinfo.value.down = data.data.down;
    planinfo.value.favorite = data.data.favorite;
  }
});
const up = () => {
  axios
    .post(`/plan/${route.params.id}/up`)
    .then(({ data }) => {
      console.log(data);
      if (data.success === true) {
        console.log("추천 성공!!");
        planinfo.value.up = planinfo.value.up + 1;
      }
    })
    .catch((data) => {
      console.log(data);
      alert(data.response.data.error);
    });
};
const down = () => {
  axios
    .post(`/plan/${route.params.id}/down`)
    .then(({ data }) => {
      console.log(data);
      if (data.success === true) {
        console.log("비추천 성공!!");
        planinfo.value.down = planinfo.value.down + 1;
      }
    })
    .catch((data) => {
      console.log(data);
      alert(data.response.data.error);
    });
};
const favorite = () => {
  axios
    .post(`/plan/${route.params.id}/favorite`)
    .then(({ data }) => {
      if (data.success === true) {
        console.log("토글 성공!!");
        planinfo.value.favorite = !planinfo.value.favorite;
      }
    })
    .catch((data) => {
      console.log(data);
      alert(data.response.data.error);
    });
};
</script>

<template>
  <div class="row">
    <div class="col-8">
      <ShowMap :attractionlist="list" />
      <div class="row">
        {{ planinfo.nickname }}
      </div>
      <div class="row">
        {{ planinfo.title }}
      </div>
      <div class="row">
        {{ planinfo.content }}
      </div>

      <div class="row">
        <i class="col-2 bi bi-hand-thumbs-up" @click="up">{{ planinfo.up }}</i>
        <i class="col-2 bi bi-hand-thumbs-down" @click="down">{{ planinfo.down }}</i>
        <i class="col-2 bi bi-heart" v-show="!planinfo.favorite" @click="favorite"></i>
        <i class="col-2 bi bi-heart-fill" v-show="planinfo.favorite" @click="favorite"></i>
      </div>
    </div>
    <div class="col-4"><PlanDetailList :items="list" /></div>
  </div>
</template>

<style scoped></style>
