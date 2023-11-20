<script setup>
import { ref } from "vue";
import PlanSearch from "./PlanSearch.vue";
const list = ref([]);
const sendlist = (data) => {
  list.value = data;
};
</script>

<template>
  <router-link :to="{ name: 'planwrite' }">계획 작성</router-link>
  <PlanSearch @sendlist="sendlist" />
  <div class="row rows-1">
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">title</th>
          <th scope="col">content</th>
          <th scope="col">nickname</th>
          <th scope="col">up</th>
          <th scope="col">down</th>
          <th scope="col">favoriteCount</th>
          <th scope="col">listCount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list" :key="item.id">
          <td>
            <router-link :to="{ name: 'planInfo', params: { id: item.id } }">{{
              item.title
            }}</router-link>
          </td>
          <td>{{ item.content }}</td>
          <td>{{ item.writer.nickname }}</td>
          <td>{{ item.up }}</td>
          <td>{{ item.down }}</td>
          <td>{{ item.favoriteCount }}</td>
          <td>{{ item.listCount }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
