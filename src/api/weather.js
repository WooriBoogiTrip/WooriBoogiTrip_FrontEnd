import { sunriseAxios } from "@/util/http-commons";

const sun = sunriseAxios();

function infoSunrise(param, success, fail) {
    sun.get("", { params: param }).then(success).catch(fail);
}

export { infoSunrise }; 