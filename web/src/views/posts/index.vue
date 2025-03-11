<!-- Forum.vue -->
<template>
  <div class="forum-container">
    <h1 class="forum-title">社区论坛</h1>

    <!-- 帖子列表 -->
    <div class="posts-list">
      <el-card v-for="post in posts" :key="post.id" class="post-card">
        <template #header>
          <div class="post-header">
            <span class="post-title">{{ post.title }}</span>
            <span class="post-time">{{ formatTime(post.createdAt) }}</span>
          </div>
        </template>
        <div class="post-content">{{ post.content }}</div>
        <div class="post-footer">
          <span>作者ID: {{ post.user_id }}</span>
          <span>最后更新: {{ formatTime(post.updatedAt) }}</span>
        </div>
      </el-card>
      <el-empty v-if="!posts.length" description="暂无帖子" :image-size="120" />
    </div>

    <!-- 发表新帖子 -->
    <div class="new-post">
      <el-form :model="newPost" ref="postForm" @submit.prevent="submitPost">
        <el-form-item>
          <el-input
            v-model="newPost.title"
            placeholder="请输入标题"
            class="title-input"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            type="textarea"
            v-model="newPost.content"
            placeholder="请输入内容"
            :rows="4"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitPost" :loading="submitting">
            发表帖子
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { getAllPostsList, postPosts } from "@/api/posts";
import { useUserStore } from "@/store/users";
import { storeToRefs } from "pinia";

// 定义帖子接口
interface Post {
  id: number;
  title: string;
  content: string;
  user_id: number;
  createdAt: string;
  updatedAt: string;
}

// 定义新帖子接口
interface NewPost {
  title: string;
  content: string;
}

// 显式声明类型
const posts = ref<Post[]>([]);
const newPost = ref<NewPost>({ title: "", content: "" });
const postForm = ref(null);
const submitting = ref(false);

const { user } = storeToRefs(useUserStore());

// 格式化时间
const formatTime = (timestamp: string): string => {
  return new Date(timestamp).toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// 获取帖子列表
const fetchPosts = async () => {
  try {
    const res = await getAllPostsList();
    if (res.data && Array.isArray(res.data)) {
      posts.value = res.data;
    }
  } catch (error) {
    ElMessage.error("获取帖子列表失败");
    console.error("Error fetching posts:", error);
  }
};

// 提交新帖子
const submitPost = async () => {
  if (!newPost.value.title || !newPost.value.content) {
    ElMessage.error("标题和内容不能为空！");
    return;
  }

  if (!user.value?.id) {
    ElMessage.error("请先登录！");
    return;
  }

  submitting.value = true;
  try {
    const postData = {
      user_id: user.value.id,
      title: newPost.value.title,
      content: newPost.value.content,
    };

    const res = await postPosts(postData);
    if (res.data) {
      await fetchPosts();
      newPost.value = { title: "", content: "" }; // 重置表单
      ElMessage.success("帖子发表成功！");
    }
  } catch (error) {
    ElMessage.error("发表帖子失败");
    console.error("Error posting:", error);
  } finally {
    submitting.value = false;
  }
};

// 组件挂载时获取帖子
onMounted(() => {
  fetchPosts();
});
</script>

<style scoped>
.forum-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 30px;
  min-height: 100vh;
}

.forum-title {
  text-align: center;
  color: #1f2937;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 40px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.posts-list {
  margin-bottom: 50px;
}

.post-card {
  margin-bottom: 25px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.1);
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: linear-gradient(to right, #f1f5f9, #fff);
  border-bottom: 1px solid #e5e7eb;
}

.post-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
}

.post-time {
  font-size: 0.875rem;
  color: #6b7280;
  background: #e5e7eb;
  padding: 4px 10px;
  border-radius: 20px;
}

.post-content {
  color: #4b5563;
  font-size: 1rem;
  line-height: 1.75;
  padding: 20px;
}

.post-footer {
  font-size: 0.875rem;
  color: #6b7280;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
}

.new-post {
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}
</style>