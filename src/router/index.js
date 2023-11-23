import { createRouter, createWebHistory } from "vue-router";
import AttractionView from "../views/AttractionView.vue";
import PlanView from "../views/PlanView.vue";
import PostView from "../views/PostView.vue";
import HomeView from "../views/HomeView.vue";
import UserView from "../views/UserView.vue";
import ElectricChargingStationView from "../views/ElectricChargingStationView.vue";
import PlanWrite from "../components/plan/PlanWrite.vue";
import PostDetail from "../components/post/PostDetail.vue";
import PostRegist from "../components/post/PostRegist.vue";
import PostUpdate from "../components/post/PostUpdate.vue";
import SignupPage from "../components/user/SignupPage.vue";
import LoginPage from "../components/user/LoginPage.vue";
import ModifyPage from "../components/user/ModifyPage.vue";
import UserVerify from "../components/user/UserVerify.vue";
import MyPage from "../components/user/MyPage.vue";
import PostList from "../components/post/PostList.vue";
import PlanList from "../components/plan/PlanList.vue";
import PlatformVerify from "../components/user/PlatformVerify.vue";
import PlanInfo from "../components/plan/PlanInfo.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
    },
    {
      path: "/attraction",
      name: "attraction",
      component: AttractionView,
    },
    {
      path: "/estations",
      name: "estations",
      // beforeEnter: onlyAuthUser,
      component: ElectricChargingStationView,
    },
    {
      path: "/board",
      name: "board",
      // component: TheBoardView,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/BoardView.vue"),
      redirect: { name: "article-list" },
      children: [
        {
          path: "list",
          name: "article-list",
          component: () => import("@/components/boards/BoardList.vue"),
        },
        {
          path: "view/:articleno",
          name: "article-view",
          component: () => import("@/components/boards/BoardDetail.vue"),
        },
        {
          path: "write",
          name: "article-write",
          component: () => import("@/components/boards/BoardWrite.vue"),
        },
        {
          path: "modify/:articleno",
          name: "article-modify",
          component: () => import("@/components/boards/BoardModify.vue"),
        },
      ],
    },
    {
      path: "/plan",
      name: "plan",
      component: PlanView,
      children: [
        {
          path: "",
          name: "planlist",
          component: PlanList,
        },
        {
          path: ":id",
          name: "planInfo",
          component: PlanInfo,
        },
        {
          path: "",
          name: "planwrite",
          component: PlanWrite,
        },
      ],
    },

    {
      path: "/post/:attraction_id",
      name: "post",
      component: PostView,
      children: [
        {
          path: "",
          name: "postlist",
          component: PostList,
        },
        {
          path: ":post_id",
          name: "postDetail",
          component: PostDetail,
        },
        {
          path: "write",
          name: "postWrite",
          component: PostRegist,
        },
        {
          path: ":post_id",
          name: "postModify",
          component: PostUpdate,
        },
      ],
    },

    {
      path: "/user",
      name: "user",
      component: UserView,
      children: [
        {
          path: "verify",
          name: "userverify",
          component: UserVerify,
        },
        {
          path: "login/:platform",
          name: "PlatformVerify",
          component: PlatformVerify,
        },
        {
          path: "modify",
          name: "usermodify",
          component: ModifyPage,
        },
        {
          path: "login",
          name: "login",
          component: LoginPage,
        },
        {
          path: "signup",
          name: "usersignup",
          component: SignupPage,
        },
        {
          path: "mypage",
          name: "mypage",
          component: MyPage,
        },
      ],
    },
    {
      path: "/map",
      name: "map",
      component: () => import("../components/map/ShowMap.vue"),
    },
  ],
});

export default router;
