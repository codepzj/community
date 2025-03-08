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
            path: "",
            component: () => import("@/views/order/list/list.vue"),
            name: "OrderList",
          },
          {
            path: "payment",
            component: () => import("@/views/order/payment/index.vue"),
            name: "OrderPayment",
          },
        ],
      },
      {
        path: "test",
        component: () => import("@/views/test/index.vue"),
        children: [
          {
            path: "payment",
            component: () => import("@/views/order/payment/index.vue"),
            name: "OrderPayment",
          },
        ],
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

export default router;
