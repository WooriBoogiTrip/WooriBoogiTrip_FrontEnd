<script>
import BoardListItem from "@/components/boards/BoardList.vue";
</script>
<template>
<div class="card mx-auto d-block" id="weatherInfo" style="width: 18rem;">
  <div class="card-body">
    <br>
    <h5 class="card-title" style="font-family: basic-B;">오늘의 게시물</h5>
    <ul class="divUl" >
      <li class="nav-item"><a href="board/view/9" class="nav-link px-2 text-body-secondary">부산여행 추천 관광지 4탄 </a></li>
      <li class="nav-item"><a href="board/view/6" class="nav-link px-2 text-body-secondary">부산여행 추천 관광지 1탄 </a></li>
      <li class="nav-item"><a href="board/view/7" class="nav-link px-2 text-body-secondary">부산여행 추천 관광지 2탄 </a></li>
    </ul>
    <router-link :to="{ name: 'board' }" class="btn btn-text text-reset" style="font-size: 12px; text-decoration: underline;">게시판 바로가기</router-link>
  </div>
</div>

</template>

<style>

#weatherInfo{
    font-family: basic-R;
}

.divUl{display: flex; align-content: flex-start; flex-direction: column; flex-wrap: wrap}
.divUl li{margin-bottom:4px;}

ul.divUl li, ol.divUl li {
  width: 200px;
    padding: 5px 0px 5px 5px;
    margin-bottom: 5px;
    border-bottom: 1px solid #efefef;
    font-size: 12px;
    list-style: none;
}

</style>