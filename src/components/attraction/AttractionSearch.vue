<script setup>
import { onMounted, ref, watch } from "vue";
import { localaxios } from "../../api/authapi";
const axios = localaxios();
const guguns = ref();
const props = defineProps({
  page: Number,
});
const condition = ref({
  gugunCode: "0",
  contentTypeId: "0",
  keyword: "",
  // page: 0,
});
const gugunload = () => {
  axios.get("/api/v1/attractions/gugun").then(({ data }) => {
    guguns.value = data;
  });
};
// watch(
//   () => props.page,
//   () => {
//     console.log(props.page);
//     condition.value.page = props.page;
//     // if (props.page != 0) {
//     // }
//     search();
//   },
//   { deep: true },
// );
watch(
  () => {
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
  gugunload();
  search();
});

const search = () => {
  axios
    .get("/api/v1/attractions/list", {
      params: condition.value,
    })
    .then(({ data }) => {
      emit("getlist", data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const reset = () => {
  search();
  emit("reset");
};

const emit = defineEmits(["getlist", "reset"]);
</script>

<template>
  <form class="d-flex my-3">
    <select
      id="search-area"
      class="form-select me-2"
      v-model="condition.gugunCode"
    >
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
      @keydown.enter.prevent=""
    />
    <button id="btn-search" class="btn btn-outline-success" type="button" @click="reset">
      검색
    </button>
  </form>
</template>


<style scoped>
body {
  font-family: 'Arial', sans-serif;
  background-color: #87C4FF; 
  color: #333;
}

.form-select, .form-control, .btn {
  border-radius: 5px;
  border: 1px solid #87C4FF;
}

.btn {
  background-color: #39A7FF;
  color: white;
}

.btn:hover {
  background-color: #39A7FF; 
}

.card {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
  margin-bottom: 20px;
}

.card-img-top {
  width: 100%;
  height: auto;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.card-title {
  color: #39A7FF; 
}

.card-body {
  padding: 15px;
}

h5, p {
  margin-bottom: 10px;
}

</style>
