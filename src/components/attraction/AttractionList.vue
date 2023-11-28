<script setup>
import { defineProps, defineEmits } from "vue";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
import { modalstateStore } from "../../stores/modalstate";

const store = modalstateStore();
const props = defineProps({
  list: Array,
  type: String,
  changestate: Boolean,
  loadstate: Boolean,
});
const emit = defineEmits(["modal", "addattraction", "load"]);

const handleItemAction = (item) => {
  window.open("https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query="+item.title)
};

const load = async (state) => {
  await emit("load");
  setTimeout(() => {
    if (props.loadstate) {
      state.complete();
    }
  }, 2000);
};
</script>

<template>
  <div class="row row-cols-1 row-cols-md-3 g-4">
    <template v-for="item in props.list" :key="item.contentId">
      <div class="col">
        <div class="card">
          <img
            :src="item.firstImage || 'src/assets/img/준비중.png'"
            class="card-img-top"
            @click="() => handleItemAction(item)"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          />
          <div class="card-body">
            <h5 class="card-title">
              {{ item.title }}
            </h5>
            <p>{{ item.addr1 || item.addr2 || '주소가 없습니다' }}</p>
            <div class="text-center">
              <button 
                class="secondary"
                @click="() => handleItemAction(item)"
              >
              검색하기
              </button>
            </div>
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
    :identifier="props.changestate"
    :slots="{ complete: ' ' }"
    :firstload="false"
  />
</template>

<style scoped>
.row {
  margin-left: -15px;
  margin-right: -15px;
}

.col {
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 30px; /* 관광지 카드 사이의 공간을 늘립니다 */
}

  #map {
    width: 100%;
    height: 700px;
    margin-bottom: 30px; /* 지도 아래에 간격 추가 */
  }
.card {
  padding: 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 10px;
  background: #ffffff;
  border: 1px solid #87C4FF; /* 테두리 색상 변경 */
}

.card:hover {
  transform: translateY(-10px); /* 호버 시 약간 위로 이동 */
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2); /* 그림자 효과 강조 */
}

.card-img-top {
  border-radius: 10px;
  object-fit: cover; /* 이미지 비율 유지 */
  height: 200px; /* 이미지 높이 통일 */
}

.card-title {
  font-weight: bold;
  color: #0275d8;
  margin-bottom: 15px; /* 제목과 내용 사이의 간격 늘림 */
}

.card-text {
  color: #555;
  margin-top: 10px;
  line-height: 1.5; /* 줄 간격 */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 최대 3줄까지만 표시 */
  -webkit-box-orient: vertical;
}

.card p {
  color: #666;
  font-size: 14px;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  align-items: center;
}

button {
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

button.primary {
  background-color: #0275d8;
  color: white;
}

button.primary:hover {
  background-color: #0056b3;
}

button.secondary {
  background-color: #f8f9fa;
  color: #333;
}

button.secondary:hover {
  background-color: #e2e6ea;
}
</style>
