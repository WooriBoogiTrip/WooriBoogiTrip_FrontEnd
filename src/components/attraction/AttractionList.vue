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

const handleItemAction = (item, actionType) => {
  const newInfo = {
    id: item.contentId,
    title: item.title,
    addr: item.addr1,
    firstImage: item.firstImage,
    overview: item.overview,
  };

  if (actionType === 'modal') {
    store.modalstate = true;
  }

  emit(actionType, newInfo);
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
            :src="item.firstImage || 'https://img.icons8.com/office/80/no-image.png'"
            class="card-img-top"
            @click="() => handleItemAction(item, 'modal')"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          />
          <div class="card-body">
            <h5 class="card-title">
              <router-link :to="'/post/' + item.contentId">{{ item.title }}</router-link>
            </h5>
            <p>{{ item.addr1 || item.addr2 || '주소가 없습니다' }}</p>
            <div class="button-container">
              <button
                class="secondary"
                :id="props.type === 'attraction' ? 'show-modal' : ''"
                @click="() => handleItemAction(item, props.type === 'attraction' ? 'modal' : 'addattraction')"
              >
                {{ props.type === 'attraction' ? '모달 보기' : '추가하기' }}
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
.card {
  padding: 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 5px; 
}

.card:hover {
  transform: scale(1.05); 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-weight: bold;
  color: #0275d8; 
  margin-bottom: 10px;
}

.card-text {
  color: #555;
  margin-top: 10px;
}

.card p {
  color: #666;
  font-size: 14px;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

button {
  border: none;
  border-radius: 5px;
  padding: 8px 15px;
  font-size: 14px;
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
