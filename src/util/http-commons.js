import axios from "axios";
import { httpStatusCode } from "./http-status";

const { VITE_VUE_API_URL, VITE_ELECTRIC_CHARGING_STATION_URL, VITE_SUNSET_INFO_URL, VITE_WEATHER_INFO_URL } = import.meta.env;

// station vue api axios instance
function stationAxios() {
  const instance = axios.create({
    baseURL: VITE_ELECTRIC_CHARGING_STATION_URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return instance;
}

// 일몰, 출몰 Axios
function sunriseAxios() {
  const instance = axios.create({
    baseURL: VITE_SUNSET_INFO_URL,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return instance;
}

// 날씨 Axios
function weatherAxios() {
  const instance = axios.create({
    baseURL: VITE_WEATHER_INFO_URL,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return instance;
}

// local vue api axios instance
function localAxios() {
  const instance = axios.create({
    baseURL: VITE_VUE_API_URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return instance;
}

export { localAxios, stationAxios, sunriseAxios, weatherAxios };
