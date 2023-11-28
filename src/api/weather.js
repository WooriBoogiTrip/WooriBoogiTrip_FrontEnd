import { sunriseAxios, weatherAxios } from "@/util/http-commons";

const sun = sunriseAxios();
const weather=weatherAxios();

// 일몰 출몰 api
function infoSunrise(param, success, fail) {
    sun.get("", { params: param }).then(success).catch(fail);
}

function infoWeather(param,success,fail){
    weather.get("", { params: param }).then(success).catch(fail);   
}

export { infoSunrise, infoWeather }; 