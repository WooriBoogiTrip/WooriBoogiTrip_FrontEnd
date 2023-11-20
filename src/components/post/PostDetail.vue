<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { localaxios } from "@/api/authapi.js";
const axios = localaxios();
const router = useRouter();
const route = useRoute();
const id = route.params.post_id;
const attractionid = route.params.attraction_id;
const title = ref();
const changedAt = ref();
const userId = ref();
const hit = ref();
const content = ref();
const calldelete = () => {
  axios.delete("/post/" + id).then(({ data }) => {
    if (data.success === true) {
      router.push({
        name: "postlist",
        params: { attraction_id: attractionid },
      });
    }
  });
};
const tolist = () => {
  router.push({ name: "postlist", params: { attraction_id: attractionid } });
};
axios.get(`/post/${attractionid}/${id}`).then(({ data }) => {
  if (data.success === true) {
    (title.value = data.title),
      (changedAt.value = data.changedAt),
      (userId.value = data.userId),
      (hit.value = data.hit),
      (content.value = data.content);
  }
});
</script>

<template>
  <p>제목 : {{ title }}</p>
  <p>수정시각 : {{ changedAt }}</p>
  <p>사용자 아이디 : {{ userId }}</p>
  <p>조회수 : {{ hit }}</p>
  <p>본문 : {{ content }}</p>
  <button
    @click="
      () =>
        router.push({
          name: 'postModify',
          params: { attraction_id: attractionid, post_id: id },
        })
    "
  >
    수정하기
  </button>
  <button @click="calldelete">삭제하기</button>
  <button @click="tolist">목록으로</button>
</template>

<style scoped></style>
