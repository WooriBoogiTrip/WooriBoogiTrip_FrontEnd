<script setup>
// 지도 리스트 검색 결과
import ShowMap from "../map/ShowMap.vue";
import AttractionSearch from "../attraction/AttractionSearch.vue";
import attractionlist from "../attraction/attractionlist.vue";
import PlanDetailList from "./PlanDetailList.vue";
import { computed, ref } from "vue";
import { localaxios } from "../../api/authapi";
const axios = localaxios();
const list = ref([]);
const getlist = (data) => {
  list.value = data;
};
// 선택된 여행지 정보
const itemlist = ref([]);
const item = ref();
const addinfo = (data) => {
  data.value.memo = "";
  item.value = data;
  // console.log(data.value.id);

  // list.value = list.value.filter((element) => {
  //   console.log(element.contentId + " " + data.value.id);
  //   element.contentId == data.value.id;
  // });
  const temp = [];
  list.value.filter((element) => {
    element.contentId != data.value.id;
    if (element.contentId != data.value.id) {
      temp.push(element);
    }
  });

  list.value = temp;

  itemlist.value.push(data);
  console.log(itemlist.value);
};
const items = computed(() => itemlist.value);
const title = ref();
const content = ref();
const postdata = ref([]);
const whenclick = () => {
  console.log("작성!!!");
  console.log(postdata.value.value);

  axios
    .post("/plan", {
      title: title.value,
      content: content.value,
      attractions: postdata.value.value,
    })
    .then(({ data }) => {
      if (data.success === true) {
        console.log("성공");
        console.log(data);
      }
    });

  // 이제 데이터 전송에 성공을 한다면 상세 보기 페이지로 넘겨주도록 하자
};
const reload = (data) => {
  console.log(data);
  postdata.value = data;
};
const del = (data) => {
  // 여기에서 리스트에 push를 해주자
  console.log(data);
  list.value.push(data);
};
</script>

<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <input type="text" v-model="title" />
        <input type="text" v-model="content" />
      </div>
      <div class="col">
        <button v-show="itemlist.length" @click="whenclick" class="btn btn-outline-primary">
          계획 작성하기
        </button>
      </div>
    </div>
    <br />
    <div class="row"></div>
    <div class="row">
      <div class="col-8">
        <ShowMap :attractionlist="list" />
      </div>
      <div class="col-4">
        <PlanDetailList :items="items" :item="item" @list="reload" type="write" @del="del" />
      </div>
    </div>
    <div class="row">
      <div class="col"><AttractionSearch @getlist="getlist" /></div>
    </div>
    <div class="row">
      <div class="col"><attractionlist :list="list" type="plan" @addattraction="addinfo" /></div>
    </div>
  </div>
</template>

<style scoped></style>
