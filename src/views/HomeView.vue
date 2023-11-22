<script setup>
import WeatherView from "./WeatherView.vue";

</script>
<template>
  <h1></h1>
  <img class="mx-auto d-block" src="../assets/img/부기트립.jpg" />
  <br>
  <p class="text-center" id="main-section">
    <h4>부산여행 가이드 ‘우리부기트립’</h4>
  </p>
  <br>
  <br>
  <p class="text-center" style='color: #39A7FF' id="notice-section">
    <h2>오늘의 날씨 정보</h2>
      <WeatherView></WeatherView>
  </p>
  <br>
  <br>
  <p class="text-center" id="notice-section">
    <h2>공지사항</h2>
  </p>
  <router-view></router-view>

</template>
<style scoped>
  #notice-section{
    font-family: 'main';
    color:#FFC436;
  }

  #main-section{
    font-family: 'basic-L';
  }
</style>
