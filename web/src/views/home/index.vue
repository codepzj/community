<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Top Cards Section -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <el-card 
        v-if="!loading"
        @click="$router.push({ name: 'RepairType' })" 
        class="cursor-pointer flex flex-col items-center justify-center p-4 shadow-md rounded-xl hover:shadow-lg hover:scale-102 transition-all duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2em"
          height="2em"
          viewBox="0 0 24 24"
          class="text-blue-500 mb-2"
        >
          <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
            <path d="M11 11L6 6M5 7.5L7.5 5l-3-1.5l-1 1zm14.975 1.475a3.5 3.5 0 0 0 .79-3.74l-1.422 1.422h-2v-2l1.422-1.422a3.5 3.5 0 0 0-4.529 4.53l-6.47 6.471a3.5 3.5 0 0 0-4.53 4.529l1.421-1.422h2v2l-1.422 1.422a3.5 3.5 0 0 0 4.53-4.528l6.472-6.472a3.5 3.5 0 0 0 3.738-.79"/>
            <path d="m11.797 14.5l5.604 5.604a1.35 1.35 0 0 0 1.911 0l.792-.792a1.35 1.35 0 0 0 0-1.911L14.5 11.797"/>
          </g>
        </svg>
        <div class="text-base font-medium text-gray-700">报修服务</div>
      </el-card>

      <el-card 
        v-if="!loading"
        @click="$router.push({ name: 'ShoppingList' })" 
        class="cursor-pointer flex flex-col items-center justify-center p-4 shadow-md rounded-xl hover:shadow-lg hover:scale-102 transition-all duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24" class="text-green-500 mb-2">
          <path fill="currentColor" d="M3.005 3.003h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-18a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1m10 10v-1h3v-2h-2.586L15.54 7.88l-1.414-1.414l-2.121 2.122l-2.121-2.122L8.469 7.88l2.122 2.122H8.005v2h3v1h-3v2h3v2h2v-2h3v-2z"/>
        </svg>
        <div class="text-base font-medium text-gray-700">费用缴纳</div>
      </el-card>

      <el-card 
        v-if="!loading"
        class="cursor-pointer flex flex-col items-center justify-center p-4 shadow-md rounded-xl hover:shadow-lg hover:scale-102 transition-all duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 1024 1024" class="text-red-500 mb-2">
          <path fill="currentColor" d="M746 835.28L544.529 723.678c74.88-58.912 95.216-174.688 95.216-239.601v-135.12c0-89.472-118.88-189.12-238.288-189.12c-119.376 0-241.408 99.664-241.408 189.12v135.12c0 59.024 24.975 178.433 100.624 239.089L54 835.278S0 859.342 0 889.342v81.088c0 29.84 24.223 54.064 54 54.064h692c29.807 0 54.031-24.224 54.031-54.064v-81.087c0-31.808-54.032-54.064-54.032-54.064z"/>
        </svg>
        <div class="text-base font-medium text-gray-700">居民论坛</div>
      </el-card>

      <el-card 
        v-if="!loading"
        class="cursor-pointer flex flex-col items-center justify-center p-4 shadow-md rounded-xl hover:shadow-lg hover:scale-102 transition-all duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 512 512" class="text-yellow-500 mb-2">
          <path fill="currentColor" d="M256 480a80.09 80.09 0 0 0 73.3-48H182.7a80.09 80.09 0 0 0 73.3 48m144-192v-60.53C400 157 372.64 95.61 304 80l-8-48h-80l-8 48c-68.88 15.61-96 76.76-96 147.47V288l-48 64v48h384v-48Z"/>
        </svg>
        <div class="text-base font-medium text-gray-700">物业通知</div>
      </el-card>

      <!-- Skeleton for Top Cards -->
      <el-card 
        v-for="n in 4" 
        :key="'skeleton-top-' + n" 
        v-if="loading" 
        class="p-4 shadow-md rounded-xl"
      >
        <div class="flex flex-col items-center justify-center h-full">
          <div class="w-8 h-8 bg-gray-200 rounded-full mb-2 animate-pulse"></div>
          <div class="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </el-card>
    </div>

    <!-- Posts Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <el-card 
        v-for="post in postsList" 
        :key="post.id"
        v-if="!loading"
        class="shadow-md rounded-xl hover:shadow-lg transition-shadow duration-200 cursor-pointer"
        @click="$router.push({ name: 'Posts', params: { id: post.id } })"
      >
        <template #header>
          <div class="card-header px-4 py-1 bg-gray-50 border-b flex justify-between items-center">
            <span class="text-base font-semibold text-gray-800 flex items-center">
              <span class="mr-2">📢</span> {{ post.title }}
            </span>
            <span class="text-xs text-gray-500">{{ dayjs(post.createdAt).format('YYYY-MM-DD HH:mm:ss') }}</span>
          </div>
        </template>
        <div class="p-4">
          <p class="text-gray-600 text-sm line-clamp-3">{{ post.content.slice(0, 100) }}{{ post.content.length > 100 ? '...' : '' }}</p>
        </div>
      </el-card>

      <!-- Skeleton for Posts -->
      <el-card 
        v-for="n in 9" 
        :key="'skeleton-post-' + n" 
        v-if="loading" 
        class="shadow-md rounded-xl"
      >
        <div class="p-4">
          <div class="h-5 bg-gray-200 rounded mb-2 animate-pulse"></div>
          <div class="space-y-2">
            <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div class="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
            <div class="h-4 bg-gray-200 rounded animate-pulse w-4/6"></div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { getPostsList } from "@/api/posts";
import { ref, onMounted } from "vue";
import dayjs from "dayjs";

const postsList = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const res = await getPostsList();
    postsList.value = res.data;
  } catch (error) {
    console.error("Failed to load posts:", error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.container {
  max-width: 1200px;
}

.hover\:scale-102 {
  transform: scale(1.02);
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.el-card {
  @apply bg-white;
}

.card-header {
  @apply flex items-center justify-between;
  min-height: 2rem; /* Minimize header height */
}

:deep(.el-card__body) {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>