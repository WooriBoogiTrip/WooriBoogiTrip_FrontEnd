import { defineStore } from "pinia";

export const authorizationStore = defineStore('authorization', {
  state: () => ({
    isLoggedIn: false,
    userData: null
  }),
});