<script setup>
import { ref, watch } from "vue";
import { localaxios } from "../../api/authapi";
const axios = localaxios();
const check = ref({
  planTitle: false,
  attractionTitle: false,
  userId: false,
  page: false,
  attractionId: false,
  favoriteCount: false,
  upCount: false,
});
const condition = ref({
  planTitle: null,
  attractionTitle: null,
  userId: null,
  page: null,
  attractionId: null,
  favoriteCount: null,
  upCount: null,
});
const emit = defineEmits(["sendlist"]);
watch(
  () => {
    Object.values(condition.value);
  },
  () => {
    axios.get("/plan", { params: condition.value }).then(({ data }) => {
      if (data.success === true) {
        emit("sendlist", data.data);
      }
    });
  },
  { deep: true, immediate: true },
);
watch(
  () => {
    Object.values(check.value);
  },
  () => {
    if (check.value.planTitle === false) {
      condition.value.planTitle = null;
    }
    if (check.value.attractionTitle === false) {
      condition.value.attractionTitle = null;
    }
    if (check.value.userId === false) {
      condition.value.userId = null;
    }
    if (check.value.page === false) {
      condition.value.page = null;
    }
    if (check.value.attractionId === false) {
      condition.value.attractionId = null;
    }
    if (check.value.favoriteCount === false) {
      condition.value.favoriteCount = null;
    }
    if (check.value.upCount === false) {
      condition.value.upCount = null;
    }
  },
  { deep: true },
);
</script>

<template>
  <div>
    <label for="">검색조건!!</label>
    <div class="row row-cols-7">
      <div class="col">
        <input type="checkbox" id="planTitle" v-model="check.planTitle" /><label for="planTitle"
          >제목</label
        >
      </div>
      <div class="col">
        <input type="checkbox" id="attractionTitle" v-model="check.attractionTitle" /><label
          for="attractionTitle"
          >관광지이름</label
        >
      </div>
      <div class="col">
        <input type="checkbox" id="userId" v-model="check.userId" /><label for="userId"
          >사용자아이디</label
        >
      </div>
      <div class="col">
        <input type="checkbox" id="page" v-model="check.page" /><label for="page">페이지</label>
      </div>
      <div class="col">
        <input type="checkbox" id="attractionId" v-model="check.attractionId" /><label
          for="attractionId"
          >관광지번호</label
        >
      </div>
      <div class="col">
        <input type="checkbox" id="favoriteCount" v-model="check.favoriteCount" /><label
          for="favoriteCount"
          >즐겨찾기수</label
        >
      </div>
      <div class="col">
        <input type="checkbox" id="upCount" v-model="check.upCount" /><label for="upCount"
          >좋아요수</label
        >
      </div>
    </div>
    <div class="container">
      <div class="row row-cols-3">
        <label for="planTitle" v-show="check.planTitle"
          >제목<input type="text" id="planTitle" v-model.lazy="condition.planTitle"
        /></label>
        <label for="attractionTitle" v-show="check.attractionTitle"
          >관광지이름<input
            type="text"
            id="attractionTitle"
            v-model.lazy="condition.attractionTitle"
        /></label>
        <label for="userId" v-show="check.userId"
          >사용자아이디<input type="text" id="userId" v-model.lazy="condition.userId"
        /></label>
        <label for="page" v-show="check.page"
          >페이지<input type="text" id="page" v-model.lazy="condition.page"
        /></label>
        <label for="attractionId" v-show="check.attractionId"
          >관광지번호<input type="text" id="attractionId" v-model.lazy="condition.attractionId"
        /></label>
        <label for="favoriteCount" v-show="check.favoriteCount"
          >즐겨찾기수<input type="text" id="favoriteCount" v-model.lazy="condition.favoriteCount"
        /></label>
        <label for="upCount" v-show="check.upCount"
          >좋아요수<input type="text" id="upCount" v-model.lazy="condition.upCount"
        /></label>
      </div>
    </div>

    <!--  -->
  </div>
</template>

<style scoped></style>
