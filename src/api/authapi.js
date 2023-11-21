import axios from "axios";
import { authorizationStore } from "@/stores/authorization.js";
const localaxios = () => {
  const store = authorizationStore();
  return axios.create({ baseURL: "http://localhost:8080/", headers: { Authorization: store.Authorization } });
};

export { localaxios };
