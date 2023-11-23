<script setup>
import { ref, watch } from "vue";
import draggable from "vuedraggable";
const props = defineProps({
  item: { type: Object, required: false },
  type: { type: String, required: false },
  items: { type: Array, required: false },
});
// 타입으로 수정이 불가능 하고 그냥 출력만 하는지 여부를 확인해서 뿌려주도록 할까
const list = ref([]);

const emit = defineEmits(["list", "del"]);
watch(
  () => props.item,
  () => {
    console.log(props.item.value);
    list.value.push(props.item.value);
  },
  { deep: true },
);
watch(
  () => list.value,
  () => {
    emit("list", list);
  },
  { deep: true },
);
const del = (data) => {
  let output = [];

  list.value = list.value.filter((element) => {
    if (element != data) {
      console.log("테스트");
      output.push(element);
    }
  });

  list.value = output;
  emit("del", data);
};
</script>

<template>
  <div class="row row-cols-1 row-cols-md-1 g-4">
    <draggable v-model="list" item-key="id" v-if="props.type === 'write'">
      <template #item="{ element }">
        <div class="col">
          <div class="card">
            <img
              :src="
                element.firstImage
                  ? element.firstImage
                  : 'https://img.icons8.com/office/80/no-image.png'
              "
              class="card-img-top"
              style="width: 200px; ,height: 100px"
            />
            <div class="card-body">
              <h5 class="card-title">{{ element.title }}</h5>
              <input type="text" v-model="element.memo" />
              <br />
              <button @click="del(element)" class="btn btn-outline-danger">삭제</button>
            </div>
          </div>
        </div>
      </template>
    </draggable>
    <!-- 아니라면 받은 데이터를 출력만 시키도록 하자 -->
    <div v-else>
      <div class="col" v-for="item in props.items" :key="item.id">
        <div class="card">
          <img
            :src="
              item.firstImage
                ? item.firstImage
                : item.firstImage2
                ? item.firstImage2
                : 'https://img.icons8.com/office/80/no-image.png'
            "
            class="card-img-top"
            style="width: 200px; ,height: 100px"
          />
          <div class="card-body">
            <h5 class="card-title">{{ item.title }}</h5>
            <input type="text" v-model="item.memo" readonly />
            <br />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
