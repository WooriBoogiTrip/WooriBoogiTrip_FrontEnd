<script setup>
import { ref, onMounted } from "vue";
import { infoSunrise, infoWeather } from "@/api/weather";

const { VITE_OPEN_API_SERVICE_KEY } = import.meta.env; 

const sunriseTime = ref();
const sunsetTime = ref();
const skyData=ref();
const rainData=ref();
let skyText=ref();
let rainText=ref();
const airTemperatureData=ref(); 
let today= new Date();
const month=today.getMonth();
const date=today.getDate();
let day=ref();
let todayStr=today.getFullYear().toString()+(today.getMonth()+1)+today.getDate().toString();
let hour=today.getHours()


const sunParam = ref({
  serviceKey: VITE_OPEN_API_SERVICE_KEY,
  locdate:todayStr,
  location:"부산",
})

const weatherParam = ref({
  serviceKey: VITE_OPEN_API_SERVICE_KEY,
  pageNo:"1",
  numOfRows:"30",
  dataType:"JSON",
  base_date:todayStr,
  base_time: calcTime().toString(),
  nx:97,
  ny:74,
})

function calcTime() {
  if (0<hour&&hour<11){
    hour="0"+(hour-1)+"30";
  } else if (hour==0) {
    hour="2330";
  } else {
    hour=(hour-1)+"30";
  }
  return hour
}

function skyCategory() {
    switch (skyData.value.fcstValue){
    case "1" :  
      skyText.value="맑음"
      break; 
      
    case "3" :
      skyText.value="구름많음"
      break;
    
    case "4" :
      skyText.value="흐림"
      break;
      
    default: 
      skyText.value="-";
  }
}

function rainCategory() {
  switch (rainData.value.fcstValue){
    case "0" :  
      rainText.value="X"
      break; 
    case "1" :  
      rainText.value="비"
      break;      
    case "2" :
      rainText.value="비/눈"
      break;   
    case "3" :
      rainText.value="눈"
      break;   
    case "4" :  
      rainText.value="소나기"
      break;   
    case "5" :  
      rainText.value="빗방울"
      break;
    case "6" :  
      rainText.value="빗방울눈날림"
      break;
    case "7" :  
      rainText.value="눈날림"
      break;
     default: 
      rainText.value="-";
  }
}

function dateCategory() {
  switch (today.getDay()){
    case 1 :  
      day.value="월"
      break;    
    case 2 :
      day.value="화"
      break;   
    case 3 :
      day.value="수"
      break;   
    case 4 :  
      day.value="목"
      break;   
    case 5 :  
      day.value="금"
      break;
    case 6 :  
      day.value="토"
      break;
    case 7 :  
      day.value="일"
      break;
    default: 
      day.value="-";
  }
}

onMounted(() => {
    getSunriseInfo();
    getWeatherInfo();
    dateCategory();
});

const getSunriseInfo = () => {
    console.log(sunParam.value);
  infoSunrise(
    sunParam.value,
      ({ data }) => {
          console.log(data.response.body.items.item)
          sunriseTime.value = data.response.body.items.item.sunrise;
          sunsetTime.value = data.response.body.items.item.sunset;
    },
      (err) => {
        console.log("res")
      console.log(err);
    }
  );
};

const getWeatherInfo = () => {
    console.log(weatherParam.value);
  infoWeather(
    weatherParam.value,
      ({ data }) => {
          console.log(data.response.body.items);
          let items=data.response.body.items;
          for (let i=0; i<items.item.length; i++){
            if (items.item[i].category=="PTY" && !rainData.value){
              rainData.value=items.item[i]
              rainCategory();
            }   
            if (items.item[i].category=="SKY" && !skyData.value){
              skyData.value=items.item[i]
              skyCategory();
            } 
            if (items.item[i].category=="T1H"){
              airTemperatureData.value=items.item[i]
              break
            } 
          }
          console.log(rainData.value)
          console.log(skyData.value)
          console.log(airTemperatureData.value)
    },
      (err) => {
        console.log("res")
      console.log(err);
    }
  );
};

</script>
<template>
<div class="card mx-auto d-block" id="weatherInfo" style="width: 18rem;">
  <div class="card-body">
    <p>{{ month+1 }}/{{date}}({{ day }})</p>
    <br>
    <h5 class="card-title" style="font-family: basic-B;">날씨 정보</h5>
    <div v-if="rainText">
      <p class="card-text"> 기온 : {{ airTemperatureData.fcstValue}}℃</p>
      <p class="card-text"> 구름 : {{ skyText }}</p>
      <p class="card-text"> 강우 : {{ rainText }}</p>
    </div>
    <br>
    <br>
    <h5 class="card-title" style="font-family: basic-B;">일물/출몰 정보</h5>
    <div v-if="sunriseTime">
    <p class="card-text">출몰 - {{ sunriseTime.substr(0,2)}} : {{ sunriseTime.substr(2,5)}} </p>
    <p class="card-text">일몰 - {{ sunsetTime.substr(0,2)}} : {{ sunsetTime.substr(2,5)}}</p>
    </div>
    <br>
    <a href="#" class="btn btn-text text-reset" style="font-size: 12px; text-decoration: underline;">날씨정보 더보기</a>
  </div>
</div>

</template>

<style>

#weatherInfo{
    font-family: basic-R;
}

</style>