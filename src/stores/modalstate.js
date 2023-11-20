import { ref } from "vue";
import { defineStore } from "pinia";

export const modalstateStore = defineStore(
  "modalstate",
  () => {
    const modalstate = ref(false);

    return { modalstate };
  },
  { persist: true },
);
