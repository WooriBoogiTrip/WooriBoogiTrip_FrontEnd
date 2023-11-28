<script setup>
import AttractionSearch from "../components/attraction/AttractionSearch.vue";
import AttractionList from "../components/attraction/AttractionList.vue";
import AttractionMap from "../components/attraction/AttractionMap.vue";
import { ref } from "vue";
import { modalstateStore } from "../stores/modalstate";
import VModal from "../components/common/VModal.vue";

const attractionList = ref([]);
const currentPage = ref(0);
const isChangeState = ref(false);
const isLoadState = ref(false);
const modalInfo = ref({
  id: 0,
  title: "",
  addr: "",
  imgsrc: "",
  overview: "",
});

const store = modalstateStore();

const appendAttractions = (newAttractions) => {
  isLoadState.value = newAttractions.length < 10;
  attractionList.value.push(...newAttractions);
};

const incrementPage = () => {
  currentPage.value++;
};

const resetAttractionList = () => {
  attractionList.value = [];
  currentPage.value = 0;
  isLoadState.value = false;
  isChangeState.value = !isChangeState.value;
};

const updateModalInfo = (info) => {
  Object.assign(modalInfo.value, info);
};

</script>

<template>
    <div class="container text-center mt-3">
    <h2 class="title-text">관광지 지도</h2>
  <Teleport to="body">
    <VModal
      :show="store.modalstate"
      v-bind="modalInfo"
      @close="store.modalstate = false"
    />
  </Teleport>
  <AttractionSearch @getlist="appendAttractions" @reset="resetAttractionList" :page="currentPage" />
  <AttractionMap :attractionlist="attractionList" @modal="updateModalInfo" />
  <br>
  <br>
  <AttractionList
    v-if="attractionList.length"
    :list="attractionList"
    type="attraction"
    @modal="updateModalInfo"
    @load="incrementPage"
    :changestate="isChangeState"
    :loadstate="isLoadState"
  />
  </div>
</template>

<style scoped></style>
