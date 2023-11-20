<script setup>
import { computed, ref } from "vue";
import { modalstateStore } from "../../stores/modalstate";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
const store = modalstateStore();
const props = defineProps({
  list: Array,
  type: String,
  changestate: Boolean,
  loadstate: Boolean,
});
const list = computed(() => props.list);
const changemodal = (item) => {
  const newinfo = ref({
    id: item.contentId,
    title: item.title,
    addr: item.addr1,
    firstImage: item.firstImage,
    overview: item.overview,
  });
  store.modalstate = true;
  emit("modal", newinfo);
};
const addattraction = (item) => {
  console.log(item);
  const newinfo = ref({
    id: item.contentId,
    title: item.title,
    addr: item.addr1,
    firstImage: item.firstImage,
    overview: item.overview,
  });
  emit("addattraction", newinfo);
};
const load = async (state) => {
  await emit("load");
  setTimeout(() => {
    if (props.loadstate) {
      state.complete();
    }
  }, 2000);
};
const emit = defineEmits(["modal", "addattraction", "load"]);
</script>

<template>
  <div class="row row-cols-1 row-cols-md-3 g-4">
    <template v-for="item in list" :key="item.contentId">
      <div class="col">
        <div class="card">
          <img
            :src="
              item.firstImage ? item.firstImage : 'https://img.icons8.com/office/80/no-image.png'
            "
            class="card-img-top"
            @click="changemodal(item)"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          />
          <div class="card-body">
            <h5 class="card-title">
              <router-link :to="'/post/' + item.contentId">{{ item.title }}</router-link>
            </h5>
            <p v-if="item.addr1 != ''">{{ item.addr1 }}</p>
            <p v-else-if="item.addr2 != ''">{{ item.addr2 }}</p>
            <p v-else>주소가 없습니다!!!</p>
            <button @click="item.show = !item.show">내용보기</button>
            <button id="show-modal" @click="changemodal(item)" v-if="props.type === 'attraction'">
              tㅁㄴㅇ
            </button>
            <button v-else @click="addattraction(item)">추가하기</button>
            <p class="card-text" v-show="item.show">
              {{ item.overview }}
            </p>
          </div>
        </div>
      </div>
    </template>
  </div>
  <InfiniteLoading
    @infinite="load"
    distance="5"
    :identifier="changestate"
    :slots="{ complete: ' ' }"
    :firstload="false"
  />
</template>

<style scoped></style>
