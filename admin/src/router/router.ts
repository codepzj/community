import {
  createWebHistory,
  createRouter,
  type RouteRecordRaw,
} from "vue-router";

import Layout from "@/layout/index.vue";
import Dashboard from "@/views/dashboard/index.vue";
import ResidentList from "@/views/user/resident.vue";
import Login from "@/views/auth/login.vue";
import Test from "@/views/test/index.vue";
import { errorView } from "@/router/modules/errorView";
import UserList from "@/views/user/list.vue";
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
      {
        path: "/",
        component: Dashboard,
        name: "Dashboard",
        meta: { role_id: [1, 2] },
      },
      {
        path: "/user/resident",
        component: ResidentList,
        name: "ResidentList",
        meta: { role_id: [1, 2] },
      },
      {
        path: "/user/list",
        component: UserList,
        name: "UserList",
        meta: { role_id: [1] },
      },
      {
        path: "/content/posts",
        component: PublishArticle,
        name: "PublishArticle",
        meta: { role_id: [1, 2] },
      },
      {
        path: "/content/list",
        component: ArticleList,
        name: "ArticleList",
        meta: { role_id: [1, 2] },
      },
      {
        path: "/repair/type",
        component: RepairType,
        name: "RepairType",
        meta: { role_id: [1] },
      },
      {
        path: "/goods/list",
        component: GoodsList,
        name: "GoodsList",
        meta: { role_id: [1] },
      },
      {
        path: "/review",
        component: ReviewList,
        name: "ReviewList",
        meta: { role_id: [1, 2] },
      },
      {
        path: "/system/",
        component: SystemSettings,
        name: "SystemSettings",
        meta: { role_id: [1] },
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
