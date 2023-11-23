<script setup>
import { ref, onMounted } from "vue";
import { listStations } from "@/api/estation";
import { listGugun } from "@/api/map";

import VKakaoMap from "@/components/common/VKakaoMap.vue";
import VSelect from "@/components/common/VSelect.vue";

// const serviceKey = import.meta.env.VITE_OPEN_API_SERVICE_KEY;
const { VITE_OPEN_API_SERVICE_KEY } = import.meta.env;

const gugunList = ref([{ text: "구군선택", value: "" }]);
const chargingStations = ref([]);
const selectStation = ref({});

const param = ref({
  serviceKey: VITE_OPEN_API_SERVICE_KEY,
  pageNo: 1,
  numOfRows: 20,
  zscode: 0,
});

onMounted(() => {
  // getChargingStations();
  getGugunList();
});


const getGugunList = () => {
  listGugun(
    ({ data }) => {
      let options = [];
      options.push({ text: "구군선택", value: "" });
      data.forEach((gugun) => {
        options.push({ text: gugun.gugunName, value: gugun.gugunCode });
      });
      gugunList.value = options;
    },
    (err) => {
      console.log(err);
    }
  );
};

const onChangeGugun = (val) => {
  param.value.zscode = val.substr(0,5);
  getChargingStations();
};

const getChargingStations = () => {
  listStations(
    param.value,
    ({ data }) => {
      chargingStations.value = data.items[0].item;
    },
    (err) => {
      console.log(err);
    }
  );
};

const viewStation = (station) => {
  selectStation.value = station;
};
</script>

<template>
  <div class="container text-center mt-3">
    <h2 class="title-text">전기차 충전소 지도</h2>
    <br>
    <div class="mx-auto d-block" style="width: 360px;">
      <div class="col d-flex justify-content-Center"><VSelect :selectOption="gugunList" @onKeySelect="onChangeGugun" /></div>
    </div>
    <br>
    <VKakaoMap :stations="chargingStations" :selectStation="selectStation" />
    <br>
    <div class="card">
      <table class="table table-hover">
        <thead>
          <tr class="text-center">
            <th scope="col">충전소명</th>
            <th scope="col">충전소ID</th>
            <th scope="col">충전기상태</th>
            <th scope="col">위치</th>
            <th scope="col">위도</th>
            <th scope="col">경도</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="text-center"
            v-for="station in chargingStations"
            :key="station.statId + station.chgerId"
            @click="viewStation(station)"
          >
            <th>{{ station.statNm }}</th>
            <td>{{ station.statId }}</td>
            <td>{{ station.stat }}</td>
            <td>{{ station.addr }}</td>
            <td>{{ station.lat }}</td>
            <td>{{ station.lng }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
.title-text{
  font-family:'main';
  color:#FFC436;
}

.card{
  font-family: 'basic-L';
}

mark.purple {
  background: linear-gradient(to top, #c354ff 20%, transparent 30%);
}
</style>
