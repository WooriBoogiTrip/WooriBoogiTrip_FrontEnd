<script setup>
import { computed } from "vue";
import ShowMap from "../map/ShowMap.vue";
const props = defineProps({
  attractionlist: Array,
});
const emit = defineEmits(["getmodal"]);
const getmodal = (data) => {
  emit("getmodal", data);
};
const list = computed(() => props.attractionlist);
</script>

<template>
  <ShowMap :attractionlist="list" @modal="getmodal" />
</template>

<style scoped></style>
