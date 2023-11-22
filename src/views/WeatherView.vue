<script setup>
import { ref, onMounted } from "vue";
import { infoSunrise } from "@/api/weather";

const { VITE_OPEN_API_SERVICE_KEY } = import.meta.env; 

const sunriseTime = ref();
const sunsetTime = ref();

const param = ref({
    serviceKey: "2IRwmYzHEp1urkO5ahQmURnb/ebOViQ/3wuyg+6Oeh+bJ+cXs/EACGafsN2sAkk6zwVixeC6ntIClhOtMxP1Mw==",
    locdate:"20231122",
    location:"부산",
})

onMounted(() => {
    getSunriseInfo();
});

const getSunriseInfo = () => {
    console.log(param.value);
  infoSunrise(
    param.value,
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


</script>
<template>
<div class="card mx-auto d-block" id="weatherInfo" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title" style="font-family: basic-B;">날씨 정보</h5>
    <br>
    <br>
    <br>
    <div v-if="sunriseTime">
    <h5 class="card-title" style="font-family: basic-B;">일물/출몰 정보</h5>
    <p class="card-text">출몰 - {{ sunriseTime.value.substring(0,2)}} : {{ sunriseTime.value.substring(2,5)}} </p>
    <p class="card-text">일몰 - {{ sunsetTime.value.substring(0,2)}} : {{ sunsetTime.value.substring(2,5)}}</p>
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