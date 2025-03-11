import router from "./router";
import { useTabStore } from "@/store/tab";
import { routeNames } from "./modules/name";
import { useUserStore } from "@/store/user";

// 监听标签栏
router.beforeEach((to, _from, next) => {
  const tabStore = useTabStore();
  const index = Object.keys(routeNames).indexOf(to.name as string);
  if (index !== -1) {
    tabStore.addTab({
      key: to.name as string,
      title: routeNames[to.name as keyof typeof routeNames],
    });
  }
  next();
});

// 未登录跳转到登录页
router.beforeEach((to, _from, next) => {
  const userStore = useUserStore();
  if (!userStore.user) {
    if (to.path !== "/login") {
      next({ path: "/login" });
    }
  }
  next();
});

// 权限控制
router.beforeEach((to, _from, next) => {
  const roleArray: number[] = Array.isArray(to.meta.role_id)
    ? to.meta.role_id
    : [];
  const userRole = useUserStore().user?.role_id;
  if (roleArray.length > 0 && !roleArray.includes(userRole as number)) {
    next({ path: "/error/403" });
  }
  next();
});
export default router;
