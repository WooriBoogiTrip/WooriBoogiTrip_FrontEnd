import { ref } from "vue";
import { defineStore } from "pinia";

export const authorizationStore = defineStore(
  "Authorization",
  () => {
    const Authorization = ref("");
    const change = (data) => {
      Authorization.value = data;
    };

    return { Authorization, change };
  },
  { persist: true },
);
