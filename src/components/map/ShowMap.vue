<script setup>
import { ref, onMounted, defineProps, watchEffect, defineEmits } from "vue";

const { VITE_KAKAO_MAP_SERVICE_KEY } = import.meta.env; 

const props = defineProps({
  attractionlist: Array
});

const emit = defineEmits(['modal']);

var map;
const markers = ref([]);

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap();
  } else {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${VITE_KAKAO_MAP_SERVICE_KEY}&libraries=services,clusterer`;
    script.onload = () => kakao.maps.load(() => initMap());
    document.head.appendChild(script);
  }
});

watchEffect(() => {
  if (props.attractionlist && map) {
    loadMarkers();
  }
});

const initMap = () => {
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(35.1795543, 129.0756416),
    level: 3,
  };
  map = new kakao.maps.Map(container, options);
};

const loadMarkers = () => {
  deleteMarkers(); // 기존 마커 삭제

  // 마커 위치 정보를 저장하기 위한 LatLngBounds 객체 생성
  const bounds = new kakao.maps.LatLngBounds();

  markers.value = props.attractionlist.map(attraction => {
    const position = new kakao.maps.LatLng(attraction.latitude, attraction.longitude);
    bounds.extend(position); // LatLngBounds 객체에 마커 위치 추가

    const marker = new kakao.maps.Marker({
      map: map,
      position: position,
      title: attraction.name
    });

    kakao.maps.event.addListener(marker, 'click', () => {
      emit('modal', attraction);
    });

    return marker;
  });
  console.log(bounds);
  // 지도 화면을 모든 마커가 포함되도록 조정
  map.setBounds(bounds);
};

const deleteMarkers = () => {
  markers.value.forEach(marker => marker.setMap(null));
  markers.value = [];
};

</script>

<template>
  <div id="map"></div>
</template>

<style>
#map {
  width: 100%;
  height: 600px;
}
</style>
