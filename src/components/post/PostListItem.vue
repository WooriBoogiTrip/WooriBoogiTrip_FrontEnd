<script setup>
import { ref } from "vue";
const infos = ref([]);
import { useRoute } from "vue-router";
import { localaxios } from "../../api/authapi";
const axios = localaxios();
const route = useRoute();
const id = route.params.attraction_id;
axios.get(`/post/${id}`).then(({ data }) => {
  if (data.success === true) {
    infos.value = data.list;
  }
});
</script>

<template>
  <ul class="list-group col-6">
    <li v-for="info in infos" :key="info.id" class="list-group-item">
      <router-link :to="'/post/' + id + '/' + info.id">{{ info.title }}</router-link> , 작성자 :
      {{ info.userId }}, 조회수 : {{ info.hit }}, 수정시각 : {{ info.changedAt }}
    </li>
  </ul>
</template>

<style scoped></style>
