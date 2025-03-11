<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Top Cards Section -->
    <div class="text-2xl font-bold mb-4">社区服务</div>
    <el-divider />
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
      <el-card
        v-if="!loading"
        @click="$router.push({ name: 'RepairType' })"
        class="card-hover bg-gradient-to-br from-blue-50 to-white"
      >
        <div class="flex flex-col items-center justify-center p-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2.5em"
            height="2.5em"
            viewBox="0 0 24 24"
            class="text-blue-600 mb-3"
          >
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
            >
              <path
                d="M11 11L6 6M5 7.5L7.5 5l-3-1.5l-1 1zm14.975 1.475a3.5 3.5 0 0 0 .79-3.74l-1.422 1.422h-2v-2l1.422-1.422a3.5 3.5 0 0 0-4.529 4.53l-6.47 6.471a3.5 3.5 0 0 0-4.53 4.529l1.421-1.422h2v2l-1.422 1.422a3.5 3.5 0 0 0 4.53-4.528l6.472-6.472a3.5 3.5 0 0 0 3.738-.79"
              />
              <path
                d="m11.797 14.5l5.604 5.604a1.35 1.35 0 0 0 1.911 0l.792-.792a1.35 1.35 0 0 0 0-1.911L14.5 11.797"
              />
            </g>
          </svg>
          <div class="text-lg font-semibold text-gray-800">报修服务</div>
        </div>
      </el-card>

      <el-card
        v-if="!loading"
        @click="$router.push({ name: 'ShoppingList' })"
        class="card-hover bg-gradient-to-br from-green-50 to-white"
      >
        <div class="flex flex-col items-center justify-center p-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2.5em"
            height="2.5em"
            viewBox="0 0 24 24"
            class="text-green-600 mb-3"
          >
            <path
              fill="currentColor"
              d="M3.005 3.003h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-18a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1m10 10v-1h3v-2h-2.586L15.54 7.88l-1.414-1.414l-2.121 2.122l-2.121-2.122L8.469 7.88l2.122 2.122H8.005v2h3v1h-3v2h3v2h2v-2h3v-2z"
            />
          </svg>
          <div class="text-lg font-semibold text-gray-800">费用缴纳</div>
        </div>
      </el-card>

      <el-card
        v-if="!loading"
        @click="$router.push({ name: 'Posts' })"
        class="card-hover bg-gradient-to-br from-red-50 to-white"
      >
        <div class="flex flex-col items-center justify-center p-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2.5em"
            height="2.5em"
            viewBox="0 0 1024 1024"
            class="text-red-600 mb-3"
          >
            <path
              fill="currentColor"
              d="M746 835.28L544.529 723.678c74.88-58.912 95.216-174.688 95.216-239.601v-135.12c0-89.472-118.88-189.12-238.288-189.12c-119.376 0-241.408 99.664-241.408 189.12v135.12c0 59.024 24.975 178.433 100.624 239.089L54 835.278S0 859.342 0 889.342v81.088c0 29.84 24.223 54.064 54 54.064h692c29.807 0 54.031-24.224 54.031-54.064v-81.087c0-31.808-54.032-54.064-54.032-54.064z"
            />
          </svg>
          <div class="text-lg font-semibold text-gray-800">居民论坛</div>
        </div>
      </el-card>

      <!-- Skeleton for Top Cards -->
      <el-card v-for="n in 3" :key="'skeleton-top-' + n" v-if="loading" class="card-hover">
        <div class="flex flex-col items-center justify-center p-6">
          <div class="w-10 h-10 bg-gray-200 rounded-full mb-3 animate-pulse"></div>
          <div class="w-24 h-5 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </el-card>
    </div>

    <div class="text-2xl font-bold mb-4">社区公告</div>
    <el-divider />
    <!-- Posts Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <el-card
        v-for="post in postsList"
        :key="post.id"
        v-if="!loading"
        class="post-card cursor-pointer"
        @click="$router.push({ name: 'Announcement', params: { id: post.id } })"
      >
        <template #header>
          <div class="card-header">
            <span class="title-text">
              <span class="mr-2">📢</span> {{ post.title }}
            </span>
            <span class="time-text">
              {{ dayjs(post.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
            </span>
          </div>
        </template>
        <div class="p-4">
          <p class="content-text">
            {{ post.content.slice(0, 100) }}{{ post.content.length > 100 ? "..." : "" }}
          </p>
        </div>
      </el-card>

      <!-- Skeleton for Posts -->
      <el-card v-for="n in 2" :key="'skeleton-post-' + n" v-if="loading" class="post-card">
        <div class="p-4">
          <div class="h-6 bg-gray-200 rounded mb-3 animate-pulse"></div>
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
import { getAnnounceMentList } from "@/api/posts";
import { ref, onMounted } from "vue";
import dayjs from "dayjs";

const postsList = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const res = await getAnnounceMentList();
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

/* Top Cards */
.card-hover {
  @apply cursor-pointer shadow-md rounded-xl transition-all duration-300;
}

.card-hover:hover {
  @apply shadow-lg transform scale-105;
}

/* Posts */
.post-card {
  @apply bg-white shadow-md rounded-xl transition-shadow duration-300 hover:shadow-lg;
}

.card-header {
  @apply px-4 py-3 bg-gray-50 border-b flex justify-between items-center;
}

.title-text {
  @apply text-base font-semibold text-gray-800 flex items-center;
}

.time-text {
  @apply text-xs text-gray-500;
}

.content-text {
  @apply text-gray-600 text-sm line-clamp-3;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .card-hover {
    @apply p-4;
  }
  
  .card-hover svg {
    @apply w-8 h-8;
  }
  
  .title-text {
    @apply text-sm;
  }
}
</style>