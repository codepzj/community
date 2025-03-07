import { createWebHistory, createRouter } from "vue-router";
import Layout from "@/layout/index.vue";
const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/",
        component: () => import("@/views/home/index.vue"),
        name: "Home",
      },
      {
        path: "/user/profile-edit",
        component: () => import("@/views/user/profile-edit.vue"),
        name: "ProfileEdit",
        meta: {
          title: "编辑用户信息",
        },
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    name: "Login",
  },
  {
    path: "/test",
    component: () => import("@/views/test/index.vue"),
    name: "Test",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
