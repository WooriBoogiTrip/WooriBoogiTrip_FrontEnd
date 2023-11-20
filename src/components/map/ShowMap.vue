<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { modalstateStore } from "../../stores/modalstate";
let map;
let markers = ref([]);
let infowindows = ref([]);
// let marker;
const props = defineProps({
  attractionlist: Array,
});
const list = computed(() => props.attractionlist);

const emit = defineEmits(["modal"]);

const store = modalstateStore();
const changemodal = (seq) => {
  store.modalstate = true;
  const newinfo = ref({
    id: list.value[seq].contentId,
    title: list.value[seq].title,
    addr: list.value[seq].addr1,
    imgsrc: list.value[seq].firstImage,
    overview: list.value[seq].overview,
  });
  emit("modal", newinfo);
};

onMounted(() => {
  window.changemodal = changemodal;
  if (window.naver && window.naver.maps) {
    initMap();
  } else {
    /* global naver */
    const script = document.createElement("script");
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${
      import.meta.env.VITE_CLIENT_ID
    }`;
    script.onload = () => {
      initMap();
      naver.maps.Event.addListener(map, "idle", function () {
        updateMarkers(map, markers);
      });
    };

    document.head.appendChild(script);
  }
});

// 윈도우
function updateMarkers(map, markers) {
  var mapBounds = map.getBounds();
  var marker, position;

  for (var i = 0; i < markers.length; i++) {
    marker = markers[i];
    position = marker.getPosition();

    if (mapBounds.hasLatLng(position)) {
      showMarker(map, marker);
    } else {
      hideMarker(map, marker);
    }
  }
}

function showMarker(map, marker) {
  if (marker.setMap()) return;
  marker.setMap(map);
}

function hideMarker(map, marker) {
  if (!marker.setMap()) return;
  marker.setMap(null);
}
function getClickHandler(seq) {
  return function (e) {
    var marker = markers.value[seq],
      infoWindow = infowindows.value[seq];

    if (infoWindow.getMap()) {
      infoWindow.close();
    } else {
      infoWindow.open(map, marker);
    }
  };
}

// 윈도우
const initMap = () => {
  map = new naver.maps.Map("map", {
    center: new naver.maps.LatLng(37.5013, 127.0396),
    zoom: 14,
  });

  makemarkers();
};

const makemarkers = async () => {
  await list.value.forEach((item) => {
    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(item.latitude, item.longitude),
      map: map,
    });

    markers.value.push(marker);
    let infoWindow = new naver.maps.InfoWindow({
      content:
        `<div style="width:150px;text-align:center;padding:10px;"
        onclick=changemodal(${infowindows.value.length}) >` +
        item.title +
        "</div>",
    });
    infowindows.value.push(infoWindow);
  });
  if (markers.value.length > 0) {
    map.setCenter(markers.value[Math.floor(Math.random() * markers.value.length)].position);
    map.setZoom(13);
  }
  for (let i = 0, ii = markers.value.length; i < ii; i++) {
    naver.maps.Event.addListener(markers.value[i], "click", getClickHandler(i));
  }
};
const deletemarkers = () => {
  markers.value.forEach((item) => {
    item.setMap(null);
  });
  infowindows = ref([]);
  markers = ref([]);
};
watch(
  () => props.attractionlist.value,
  () => {
    if (window.naver && window.naver.maps) {
      deletemarkers();
      makemarkers();
    }
  },
  { deep: true },
);
</script>

<template>
  <div id="map" style="width: 100%; height: 300px"></div>
</template>

<style scoped></style>
