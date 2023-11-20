<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { localaxios } from "../../api/authapi";
const route = useRoute();
const router = useRouter();
const title = ref();
const content = ref();
const attractionId = route.params.attraction_id;
const axios = localaxios();
const regist = () => {
  axios
    .post("/post", {
      title: title.value,
      content: content.value,
      attractionId: attractionId,
    })
    .then(({ data }) => {
      if (data.success === true) {
        router.push({
          name: "postDetail",
          params: {
            attraction_id: attractionId,
            post_id: data.postId,
          },
        });
      }
    });
};
</script>

<template>
  <form>
    <div class="mb-3">
      <label for="title" class="form-label">제목</label>
      <input type="text" class="form-control" id="title" v-model="title" />
    </div>
    <div class="mb-3">
      <label for="content" class="form-label">본문</label>
      <textarea class="form-control" id="content" rows="5" v-model="content"></textarea>
    </div>
    <div class="col-12">
      <button @click="regist" type="button" class="btn btn-primary">글 작성</button>
    </div>
  </form>
</template>

<style scoped></style>
