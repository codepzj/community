import {
  createWebHistory,
  createRouter,
  type RouteRecordRaw,
} from "vue-router";

import Layout from "@/layout/index.vue";
import Dashboard from "@/views/dashboard/index.vue";
import ResidentList from "@/views/user/resident.vue";
import UserList from "@/views/user/list.vue";
import Login from "@/views/auth/login.vue";
import Test from "@/views/test/index.vue";
import { errorView } from "@/router/modules/errorView";
import UserRole from "@/views/user/role.vue";
import PublishArticle from "@/views/content/posts/index.vue";
import ArticleList from "@/views/content/list/index.vue";
import RepairType from "@/views/repair/type.vue";
import SystemSettings from "@/views/system/index.vue";
import GoodsList from "@/views/goods/list.vue";
import ReviewList from "@/views/review/list.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Layout,
    children: [
      { path: "/", component: Dashboard, name: "Dashboard" },
      {
        path: "/user/resident",
        component: ResidentList,
        name: "ResidentList",
      },
      {
        path: "/user/list",
        component: UserList,
        name: "UserList",
      },
      {
        path: "/user/role",
        component: UserRole,
        name: "UserRole",
      },
      {
        path: "/content/posts",
        component: PublishArticle,
        name: "PublishArticle",
      },
      {
        path: "/content/list",
        component: ArticleList,
        name: "ArticleList",
      },
      {
        path: "/repair/type",
        component: RepairType,
        name: "RepairType",
      },
      {
        path: "/goods/list",
        component: GoodsList,
        name: "GoodsList",
      },
      {
        path: "/review",
        component: ReviewList,
        name: "ReviewList",
      },
      {
        path: "/system/",
        component: SystemSettings,
        name: "SystemSettings",
      },
    ],
  },
  {
    path: "/login",
    component: Login,
    name: "Login",
  },
  {
    path: "/test",
    component: Test,
    name: "Test",
  },
  {
    path: "/error",
    redirect: { name: "404" },
    children: errorView,
  },
  {
    path: "/:pathMatch(.*)",
    redirect: { name: "404" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
