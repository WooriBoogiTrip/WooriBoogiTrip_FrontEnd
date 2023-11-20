import { createRouter, createWebHistory } from "vue-router";
import AttractionView from "../views/AttractionView.vue";
import PlanView from "../views/PlanView.vue";
import PostView from "../views/PostView.vue";
import HomeView from "../views/HomeView.vue";
import UserView from "../views/UserView.vue";
import PlanWrite from "../components/plan/PlanWrite.vue";
import PostDetail from "../components/post/PostDetail.vue";
import PostRegist from "../components/post/PostRegist.vue";
import PostUpdate from "../components/post/PostUpdate.vue";
import SignupResult from "../components/user/SignupResult.vue";
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
      path: "/attraction",
      name: "attraction",
      component: AttractionView,
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
          path: "signup/result",
          name: "usersignupresult",
          component: SignupResult,
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
    {
      path: "/drag",
      name: "drag",
      component: () => import("../components/dragtest/DragTest.vue"),
    },
    {
      path: "/search",
      name: "search",
      component: () => import("../components/plan/PlanSearch.vue"),
    },
  ],
});

export default router;
