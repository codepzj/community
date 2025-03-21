<template>
  <div class="forum-container">
    <h1 class="text-4xl font-bold text-center my-6">社区论坛</h1>
    
    <div v-for="post in posts" :key="post.id" class="post-item">
      <PostItem :post="post" @reply="handleReply" />
    </div>
    <Card>
      <el-form class="new-post-form" @submit.prevent="submitPost">
        <el-form-item>
          <el-input v-model="postForm.title" placeholder="输入帖子标题" class="my-6"></el-input>
          <el-input v-model="postForm.content" placeholder="输入新帖子内容" type="textarea" rows="3"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="flex justify-end">
            <el-button type="primary" @click="submitPost">发布</el-button>
          </div>
        </el-form-item>
      </el-form>
    </Card>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getAllPostsList, postPosts } from "@/api/posts";
import PostItem from "./post-item.vue";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/store/users";
import { storeToRefs } from "pinia";

const posts = ref([]);
const postForm = ref({
  title: "",
  content: "",
  reply_id: null,
});
const { user } = storeToRefs(useUserStore());

const fetchPosts = async () => {
  try {
    const res = await getAllPostsList();
    if (res.code === 200) {
      posts.value = res.data;
    }
  } catch (error) {
    ElMessage.error("获取帖子失败");
  }
};

const submitPost = async () => {
  if (!postForm.value.title.trim() || !postForm.value.content.trim()) return;
  if (!user.value?.id) {
    ElMessage.error("请先登录");
    return;
  }
  try {
    await postPosts({ 
      user_id: user.value.id, 
      reply_id: null, 
      title: postForm.value.title, 
      content: postForm.value.content 
    });
    ElMessage.success("发布成功");
    postForm.value.title = "";
    postForm.value.content = "";
    fetchPosts();
  } catch (error) {
    ElMessage.error("发布失败");
  }
};

const handleReply = async ({ reply_id, content }) => {
  if (!user.value?.id) {
    ElMessage.error("请先登录");
    return;
  }
  if (!content.trim()) {
    ElMessage.error("回复内容不能为空");
    return;
  }
  try {
    await postPosts({ 
      user_id: user.value.id, 
      reply_id, 
      title: "", // 回复可以不需要标题，或根据需求设置默认值
      content 
    });
    ElMessage.success("回复成功");
    fetchPosts(); // 刷新帖子列表
  } catch (error) {
    ElMessage.error("回复失败");
  }
};

onMounted(fetchPosts);
</script>

<style scoped>
.forum-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.post-item {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.post-item:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.post-title {
  font-size: 18px;
  font-weight: bold;
}

.post-time {
  font-size: 14px;
  color: #666;
}

.post-content {
  margin-bottom: 10px;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.reply-form {
  margin-top: 10px;
}
</style>