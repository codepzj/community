<template>
  <el-page-header @back="goBack">
    <template #content>
      <span class="text-large font-bold font-600 mr-3">{{ title }}</span>
    </template>
  </el-page-header>
  <el-divider />
</template>

<script setup>
import { useRouter } from "vue-router";
defineProps({
  title: {
    type: String,
    default: "",
  },
});
const router = useRouter();
const goBack = () => {
  router.back();
};
</script>
