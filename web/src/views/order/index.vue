<template>
  <div class="p-4">
    <go-back title="订单列表" />

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="购物订单" name="shopping"></el-tab-pane>
      <el-tab-pane label="维修订单" name="repair"></el-tab-pane>
      <el-tab-pane label="水电缴纳" name="fee"></el-tab-pane>
    </el-tabs>
    
    <router-view />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import GoBack from "@/components/goback.vue";

const activeName = ref("shopping"); // 默认 shopping
const route = useRoute();
const router = useRouter();

const handleClick = (tab) => {
  console.log("切换标签:", tab.props.name);
};

// **初始化时从 `route.path` 解析 `activeName`**
onMounted(() => {
  if (route.path.includes("/order/repair")) {
    activeName.value = "repair";
  } else if (route.path.includes("/order/shopping")) {
    activeName.value = "shopping";
  } else if (route.path.includes("/order/fee")) {
    activeName.value = "fee";
  }
});

// **监听 `activeName` 变化，修改路由**
watch(activeName, (newVal) => {
  if (newVal === "shopping") {
    router.push({ path: "/order/shopping" });
  } else if (newVal === "repair") {
    router.push({ path: "/order/repair" });
  } else if (newVal === "fee") {
    router.push({ path: "/order/fee" });
  }
});

// **监听 `route.path` 变化，确保 `tab` 状态和 `route` 保持一致**
watch(() => route.path, (newPath) => {
  if (newPath.includes("/order/repair")) {
    activeName.value = "repair";
  } else if (newPath.includes("/order/shopping")) {
    activeName.value = "shopping";
  } else if (newPath.includes("/order/fee")) {
    activeName.value = "fee";
  }
});
</script>
