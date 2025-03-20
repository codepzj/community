<template>
  <div>
    <a-menu
      v-model:selectedKeys="state.selectedKeys"
      mode="inline"
      :open-keys="state.openKeys"
      :items="filteredItems"
      @openChange="onOpenChange"
      @select="onSelect"
      :style="{ height: '100%', borderRight: 0 }"
    ></a-menu>
  </div>
</template>

<script lang="ts" setup>
import { h, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";
import {
  HomeOutlined,
  UserOutlined,
  AppstoreOutlined,
  SettingOutlined,
  ToolOutlined,
  ShoppingCartOutlined,
  CheckCircleOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons-vue";
import type { MenuProps } from "ant-design-vue";

type MenuItemType = Required<MenuProps>["items"][number];

// **getItem 方法：区分子菜单和单项**
function getItem(
  label: string,
  key: string,
  role: string, // 修改为 string 类型
  icon?: any,
  children?: MenuItemType[]
): MenuItemType {
  if (children && children.length) {
    return {
      key,
      icon,
      label,
      children, // 仅 SubMenuType 才有 children
      type: undefined, // 避免 TypeScript 误判
      role,
    } as MenuItemType;
  } else {
    return {
      key,
      icon,
      label,
      type: undefined,
      role,
    } as MenuItemType;
  }
}

const userStore = useUserStore();
const userRole = userStore.user?.role_id || '0'; // 获取当前用户角色 ID，确保为字符串

const items: MenuItemType[] = [
  getItem("仪表盘", "Dashboard", "1,2", () => h(HomeOutlined)), 
  getItem("用户管理", "User", "1,2", () => h(UserOutlined), [
    getItem("居民列表", "ResidentList", "1,2"), 
    getItem("用户列表", "UserList", "1"), 
  ]),
  getItem("公告管理", "Content", "1,2", () => h(AppstoreOutlined), [
    getItem("发布公告", "PublishArticle", "1,2"), 
    getItem("公告列表", "ArticleList", "1,2"), 
  ]),
  getItem("维修管理", "Repair", "1", () => h(ToolOutlined), [
    getItem("维修类型", "RepairType", "1"), 
  ]),
  getItem("商品管理", "Goods", "1", () => h(ShoppingCartOutlined), [
    getItem("商品列表", "GoodsList", "1"), 
  ]),
  getItem("审核管理", "Review", "1,2", () => h(CheckCircleOutlined), [
    getItem("审核列表", "ReviewList", "1,2"), 
  ]),
  getItem("缴费管理", "Payment", "1", () => h(MoneyCollectOutlined), [
    getItem("缴费管理", "PaymentManage", "1"), 
  ]),
  getItem("系统设置", "System", "1", () => h(SettingOutlined), [
    getItem("系统设置", "SystemSettings", "1"), 
  ]),
];

// **过滤菜单**
const filteredItems = computed(() => {
  return items
    .map((item) => {
      if (item && "children" in item && item.children) {
        const filteredChildren = item.children.filter((child) =>
          (child as any).role?.split(',').map(Number).includes(userRole) 
        );
        return filteredChildren.length > 0
          ? { ...item, children: filteredChildren }
          : null;
      }
      return (item as any).role?.split(',').map(Number).includes(userRole) ? item : null; 
    })
    .filter(Boolean) as MenuItemType[];
});

const state = reactive({
  rootSubmenuKeys: ["Dashboard", "User", "Content", "Repair", "Goods", "Review", "System"],
  openKeys: ["User", "Content"],
  selectedKeys: [],
});

const router = useRouter();

const onSelect = ({ key }: { key: string }) => {
  console.log(key);
  router.push({ name: key });
};

const onOpenChange = (openKeys: string[]) => {
  const latestOpenKey = openKeys.find(
    (key) => state.openKeys.indexOf(key) === -1
  );
  if (
    typeof latestOpenKey === "string" &&
    state.rootSubmenuKeys.indexOf(latestOpenKey) === -1
  ) {
    state.openKeys = openKeys;
  } else {
    state.openKeys = latestOpenKey ? [latestOpenKey] : [];
  }
};
</script>
