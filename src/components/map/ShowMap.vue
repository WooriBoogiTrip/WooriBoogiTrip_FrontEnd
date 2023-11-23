<script setup>
import { ref, onMounted, defineProps, watchEffect, defineEmits } from "vue";

const props = defineProps({
  attractionList: Array
});

const emit = defineEmits(['modal']);

var map;
const markers = ref([]);

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap();
  } else {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=5397646f0d588267a857aa5ebcc6eee1&libraries=services,clusterer`;
    script.onload = () => kakao.maps.load(() => initMap());
    document.head.appendChild(script);
  }
});

watchEffect(() => {
  if (props.attractionList && map) {
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
  deleteMarkers();
  markers.value = props.attractionList.map(attraction => {
    const position = new kakao.maps.LatLng(attraction.latitude, attraction.longitude);
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

  // 지도 범위 설정 로직...
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
