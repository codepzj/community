<template>
  <div class="w-2/3 mx-auto p-6 bg-white rounded-lg shadow-sm">
    <h1 class="text-3xl font-bold text-gray-800 mb-4">
      <span class="text-2xl">🔊</span> {{ postsDetail.title }}
    </h1>

    <div class="flex justify-between items-center mb-6 text-sm">
      <div class="flex items-center space-x-2">
        <span class="text-gray-500 font-medium">发布于:</span>
        <span class="text-gray-600">{{
          dayjs(postsDetail.createdAt).format("YYYY-MM-DD HH:mm:ss")
        }}</span>
      </div>
      <div class="flex items-center space-x-2">
        <span class="text-gray-500 font-medium">更新于:</span>
        <span class="text-gray-600">{{
          dayjs(postsDetail.updatedAt).format("YYYY-MM-DD HH:mm:ss")
        }}</span>
      </div>
    </div>
    <div class="flex space-x-10">
      <MdPreview :id="editorid" :modelValue="postsDetail.content" />
      <MdCatalog :editorId="editorid" :scrollElement="scrollElement" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getAnnounceMentDetail } from "@/api/posts";
import dayjs from "dayjs";
import { MdPreview, MdCatalog } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";

const editorid = "preview-only";
const scrollElement = document.documentElement;
const { id } = useRoute().params;
const postsDetail = ref({});

onMounted(async () => {
  const res = await getAnnounceMentDetail(id);
  postsDetail.value = res.data;
});
</script>

<style scoped>
/* Optional: Add custom styles for v-html content if needed */
:deep(.prose) {
  /* Customize prose styles */
  h2 {
    @apply mt-6 mb-4 text-2xl font-semibold text-gray-800;
  }
  p {
    @apply mb-4;
  }
  a {
    @apply text-blue-600 hover:underline;
  }
}
</style>
