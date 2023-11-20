<script setup>
import { onMounted, ref, watch } from "vue";
import { localaxios } from "../../api/authapi";
const axios = localaxios();
const sidos = ref();
const guguns = ref();
const props = defineProps({
  page: Number,
});
const condition = ref({
  sidoCode: "0",
  gugunCode: "0",
  contentTypeId: "0",
  keyword: "",
  page: 0,
});
const getSido = () => {
  axios.get("/attraction/sido").then(({ data }) => {
    if (data.success === true) {
      sidos.value = data.list;
    }
  });
};
watch(
  () => props.page,
  () => {
    console.log(props.page);
    condition.value.page = props.page;
    // if (props.page != 0) {
    // }
    search();
  },
  { deep: true },
);
watch(
  () => {
    condition.value.sidoCode;
    condition.value.gugunCode;
    condition.value.contentTypeId;
    condition.value.keyword;
  },
  () => {
    reset();
  },
  { deep: true },
);

onMounted(() => {
  getSido();
  search();
});

const gugunload = () => {
  axios.get("/attraction/gugun/" + condition.value.sidoCode).then(({ data }) => {
    if (data.success === true) {
      guguns.value = data.list;
    }
  });
};

const search = () => {
  axios
    .get("/attraction/list", {
      params: condition.value,
    })
    .then(({ data }) => {
      console.log("search 요청!!!");
      console.log(condition.value);
      if (data.success === true) {
        emit("getlist", data.list);
      }
    });
};
const reset = () => {
  emit("reset");
  search;
};

const emit = defineEmits(["getlist", "reset"]);
</script>

<template>
  <form class="d-flex my-3">
    <select
      id="search-area"
      class="form-select me-2"
      @change="gugunload()"
      v-model="condition.sidoCode"
    >
      <option value="0" selected>시도 선택</option>
      <option :value="sido.sidoCode" v-for="sido in sidos" :key="sido.sidoCode">
        {{ sido.sidoName }}
      </option>
    </select>
    <select id="search-area-gugun" class="form-select me-2" v-model="condition.gugunCode">
      <option value="0" selected>구군 선택</option>
      <option :value="gugun.gugunCode" v-for="gugun in guguns" :key="gugun.gugunCode">
        {{ gugun.gugunName }}
      </option>
    </select>
    <select id="search-content-id" class="form-select me-2" v-model="condition.contentTypeId">
      <option value="0" selected>관광지 유형</option>
      <option value="12">관광지</option>
      <option value="14">문화시설</option>
      <option value="15">축제공연행사</option>
      <option value="25">여행코스</option>
      <option value="28">레포츠</option>
      <option value="32">숙박</option>
      <option value="38">쇼핑</option>
      <option value="39">음식점</option>
    </select>
    <input
      id="search-keyword"
      class="form-control me-2"
      type="search"
      placeholder="검색어"
      aria-label="검색어"
      v-model.lazy="condition.keyword"
    />
    <button id="btn-search" class="btn btn-outline-success" type="button" @click="reset">
      검색
    </button>
  </form>
</template>

<style scoped></style>
