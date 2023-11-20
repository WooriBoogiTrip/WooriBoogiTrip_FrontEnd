<script setup>
import { useRouter } from "vue-router";
import { modalstateStore } from "../../stores/modalstate";
const store = modalstateStore();

const router = useRouter();
const props = defineProps({
  id: Number,
  title: String,
  addr: String,
  overview: String,
  imgsrc: String,
  show: Boolean,
});
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header">관광지 상세보기</slot>
        </div>

        <div class="modal-body">
          <img :src="props.imgsrc" class="img" />
          <h3>{{ props.title }}</h3>
          <h4>{{ props.addr }}</h4>
          <p>{{ props.overview }}</p>
        </div>

        <div class="modal-footer">
          <button
            @click="
              async () => {
                store.modalstate = false;

                router.push({ name: 'postlist', params: { attraction_id: props.id } });
              }
            "
          >
            게시판으로 이동하기
          </button>
          <button class="modal-default-button" @click="$emit('close')">닫기</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.img {
  width: 500px;
  height: 500px;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
  scroll-behavior: auto;
}

.modal-container {
  width: 700px;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}

.modal-default-button {
  float: right;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
