import { localAxios } from "@/util/http-commons";

const local = localAxios();

function listSido(success, fail) {
  local.get(`/attractions/sido`).then(success).catch(fail);
}

function listGugun(success, fail) {
  local.get(`/attractions/gugun`).then(success).catch(fail);
}

export { listSido, listGugun };
