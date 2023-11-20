<script setup>
import { ref } from "vue";
import draggable from "vuedraggable";

const testarray = ref([
  { name: "테스트1번" },
  { name: "테스트2번" },
  { name: "테스트3번" },
  { name: "테스트4번" },
  { name: "테스트5번" },
]);
// const objtest = ref({
//   name: "이름",
//   age: 20,
//   nickname: "kty",
// });
// console.log(JSON.stringify(objtest.value));
// console.log(objtest.value);
</script>

<template>
  <draggable v-model="testarray" item-key="id">
    <template #item="{ element }">
      <div>{{ element.name }}</div>
    </template>
  </draggable>
</template>

<style scoped></style>
