import { createWebHistory, createRouter } from "vue-router";
import Layout from "@/layout/index.vue";
import { ElMessage } from "element-plus";

import { useUserStore } from "@/store/users";

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
      {
        path: "/repair",
        component: () => import("@/views/repair/index.vue"),
        name: "Repair",
        children: [
          {
            path: "",
            component: () => import("@/views/repair/type/index.vue"),
            name: "RepairType",
          },
          {
            path: "list",
            component: () => import("@/views/repair/list/index.vue"),
            name: "RepairList",
          },
        ],
      },
      {
        path: "/order",
        name: "Order",
        component: () => import("@/views/order/index.vue"),
        children: [
          {
            path: "repair",
            component: () => import("@/views/order/list/repair/list.vue"),
            name: "RepairList",
          },
          {
            path: "shopping",
            component: () => import("@/views/order/list/shop/list.vue"),
            name: "ShoppingList",
          },
        ],
      },
      {
        path: "payment/:cart_id",
        component: () => import("@/views/payment/index.vue"),
        name: "ShoppingPayment",
      },
      {
        path: "goods",
        component: () => import("@/views/goods/index.vue"),
        name: "GoodsList",
      },
      {
        path: "posts",
        component: () => import("@/views/posts/index.vue"),
        name: "Posts",
      },
      {
        path: "announcement",
        component: () => import("@/views/home/announcement.vue"),
        name: "Announcement",
      },
    ],
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

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  // 排除首页
  if (to.path === "/") {
    next();
    return;
  }
  if (!userStore.user) {
    ElMessage.error("请先登录");
    next({ path: "/" });
  }
  next();
});
export default router;
