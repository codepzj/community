<template>
  <div class="text-2xl font-bold">社区管理系统</div>
  <a-divider />
  <div v-if="isAdmin" class="text-lg text-gray-700 mb-4">
    当前用户角色为 <span class="font-semibold">{{ userStore.user?.role_id === 1 ? "管理员" : "社区工作者" }}</span>
  </div>
  <a-card>
    <p>
      本课题主要是开发一套社区居民服务管理系统。该平台按用户类划分，功能分为：
      <br />
      （1）用户模块：用户模块主要服务于社区居民，主要功能有注册与登录、修改个人信息、费用缴纳、报修服务、居民论坛、查看订单等功能。
      <br />
      （2）工作者模块：工作者模块专为社区工作者设计，主要功能有登录与认证、用户管理、管理用户费用缴纳信息、管理报修服务、管理论坛留言等功能。
      <br />
      （3）管理员模块：管理员模块的管理员可以通过登录后台端对全平台的数据进行维护，主要功能有工作者管理、系统设置等功能。
    </p>
  </a-card>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store/user";
import { computed } from "vue";
const userStore = useUserStore();
const isAdmin = computed(() => userStore.user?.role_id === 1);
</script>

<style scoped></style>
