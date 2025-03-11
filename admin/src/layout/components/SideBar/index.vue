<template>
  <div>
    <a-menu
      v-model:selectedKeys="state.selectedKeys"
      mode="inline"
      :open-keys="state.openKeys"
      :items="items"
      @openChange="onOpenChange"
      @select="onSelect"
      :style="{ height: '100%', borderRight: 0 }"
    ></a-menu>
  </div>
</template>
<script lang="ts" setup>
import { VueElement, h, reactive } from "vue";
import { useRouter } from "vue-router";
import {
  HomeOutlined,
  UserOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";
import type { ItemType } from "ant-design-vue";

function getItem(
  label: VueElement | string,
  key: string,
  icon?: any,
  children?: ItemType[],
  type?: "group"
): ItemType {
  return {
    key: key.charAt(0).toUpperCase() + key.slice(1), // 将key改为大驼峰
    icon,
    children,
    label,
    type,
  } as ItemType;
}

const items: ItemType[] = reactive([
  getItem("仪表盘", "Dashboard", () => h(HomeOutlined)),
  getItem("用户管理", "User", () => h(UserOutlined), [
    getItem("居民列表", "ResidentList", null),
    getItem("用户列表", "UserList", null),
    getItem("用户角色", "UserRole", null),
  ]),
  getItem("公告管理", "Content", () => h(AppstoreOutlined), [
    getItem("发布公告", "PublishArticle", null),
    getItem("公告列表", "ArticleList", null),
  ]),
  getItem("维修管理", "Repair", () => h(SettingOutlined), [
    getItem("维修类型", "RepairType", null),
  ]),
  getItem("商品管理", "Goods", () => h(SettingOutlined), [
    getItem("商品列表", "GoodsList", null),
  ]),
  getItem("审核管理", "Review", () => h(SettingOutlined), [
    getItem("审核列表", "ReviewList", null),
  ]),
  getItem("系统设置", "System", () => h(SettingOutlined), [
    getItem("系统设置", "SystemSettings", null),
  ]),
]);

const state = reactive({
  rootSubmenuKeys: [
    "Dashboard",
    "User",
    "Content",
    "Interaction",
    "Data",
    "Notice",
    "System",
  ],
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
