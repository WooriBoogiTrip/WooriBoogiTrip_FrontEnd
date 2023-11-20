<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { localaxios } from "@/api/authapi.js";
const axios = localaxios();
const route = useRoute();
const router = useRouter();
const contentId = route.params.attraction_id;
const title = ref();
const addr = ref();
const firstImage = ref();
const overview = ref();
const latitude = ref();
const longitude = ref();

axios.get(`/attraction/${contentId}`).then(({ data }) => {
  if (data.success === true) {
    title.value = data.title;
    addr.value = data.addr;
    firstImage.value = data.firstImage;
    overview.value = data.overview;
    latitude.value = data.latitude;
    longitude.value = data.longitude;
  }
});
</script>

<template>
  <div class="row row-cols-1 row-cols-md-2 g-4">
    <div class="col">
      <div class="card">
        <img :src="firstImage" class="card-img-top" />
        <div class="card-body">
          <h5 class="card-title">
            {{ title }}
          </h5>
          <p>{{ addr }}</p>
          <p class="card-text">
            {{ overview }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <button
    @click="
      () => {
        router.push({ name: 'postWrite' });
      }
    "
  >
    글 작성하기
  </button>
</template>

<style scoped></style>
