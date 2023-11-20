<script setup>
import AttractionSearch from "../components/attraction/AttractionSearch.vue";
import AttractionList from "../components/attraction/AttractionList.vue";
import AttractionMap from "../components/attraction/AttractionMap.vue";
import { ref } from "vue";
import { modalstateStore } from "../stores/modalstate";
import VModal from "../components/common/VModal.vue";
const list = ref([]);
const getlist = (data) => {
  if (data.length < 10) {
    console.log("10개 이하 감지!!");
    loadstate.value = true;
  } else {
    loadstate.value = false;
  }
  data.forEach((element) => {
    list.value.push(element);
  });
};
const page = ref(0);
const loading = () => {
  page.value = page.value + 1;
};
const reset = () => {
  list.value = [];
  page.value = 0;
  loadstate.value = false;
  changestate.value = !changestate.value;
};
const changestate = ref(false);
const loadstate = ref(false);
const store = modalstateStore();
const infos = ref({
  id: 0,
  title: "",
  addr: "",
  imgsrc: "",
  overview: "",
});
const getmodal = (info) => {
  infos.value.id = info.value.id;
  infos.value.title = info.value.title;
  infos.value.addr = info.value.addr;
  infos.value.imgsrc = info.value.imgsrc;
  infos.value.overview = info.value.overview;
};
</script>

<template>
  <Teleport to="body">
    <VModal
      :show="store.modalstate"
      :id="infos.id"
      :title="infos.title"
      :addr="infos.addr"
      :imgsrc="infos.imgsrc"
      :overview="infos.overview"
      @close="store.modalstate = false"
    />
  </Teleport>
  <AttractionSearch @getlist="(data) => getlist(data)" @reset="reset" :page="page" />
  <div>----------------</div>
  <h3>지도 출력</h3>
  <AttractionMap :attractionlist="list" @modal="getmodal" />
  <div>----------------</div>
  <AttractionList
    v-if="list != null"
    :list="list"
    type="attraction"
    @modal="getmodal"
    @load="loading"
    :changestate="changestate"
    :loadstate="loadstate"
  />
</template>

<style scoped></style>
