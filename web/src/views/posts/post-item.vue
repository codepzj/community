<template>
  <div class="post-item">
    <div class="post-header">
      <span class="post-title" v-if="post.title">{{ post.title }}</span>
      <span class="post-time">{{ formatTime(post.createdAt) }}</span>
    </div>
    <div class="post-content">{{ post.content }}</div>
    <div class="post-footer">
      <span class="post-author">作者ID: {{ post.user_id }}</span>
      <div class="flex justify-end">
        <el-button size="small" type="primary" text @click="showReply = !showReply">回复</el-button>
      </div>
    </div>
    
    <el-form v-if="showReply" class="reply-form" @submit.prevent="submitReply">
      <el-form-item>
        <el-input type="textarea" v-model="replyContent" placeholder="输入回复内容" rows="3"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitReply">提交</el-button>
      </el-form-item>
    </el-form>
    
    <div v-if="post.list?.length" class="replies">
      <PostItem v-for="reply in post.list" :key="reply.id" :post="reply" @reply="$emit('reply', $event)" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  post: Object,
});
const emit = defineEmits(["reply"]);

const showReply = ref(false);
const replyContent = ref("");

const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const submitReply = () => {
  if (!replyContent.value.trim()) {
    return;
  }
  emit("reply", { reply_id: props.post.id, content: replyContent.value });
  replyContent.value = "";
  showReply.value = false;
};
</script>

<style scoped>
.post-item {
  background: #ffffff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.post-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.post-title {
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
}

.post-time {
  font-size: 12px;
  color: #7f8c8d;
  background: #f5f6fa;
  padding: 2px 8px;
  border-radius: 12px;
}

.post-content {
  margin: 0 0 12px 0;
  line-height: 1.6;
  color: #34495e;
  font-size: 15px;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #eef2f7;
  padding-top: 12px;
}

.post-author {
  font-size: 13px;
  color: #95a5a6;
}

.reply-form {
  margin-top: 16px;
  padding: 12px;
  background: #f9fafc;
  border-radius: 6px;
  border: 1px solid #eef2f7;
}

.replies {
  margin-top: 16px;
  padding-left: 20px;
  border-left: 2px solid #e8ecef;
}

/* Element Plus 组件的样式调整 */
:deep(.el-button--primary) {
  font-weight: 500;
}

:deep(.el-textarea__inner) {
  border-color: #dfe6e9;
  background: #fff;
  resize: vertical;
}

:deep(.el-textarea__inner:focus) {
  border-color: #409eff;
  box-shadow: 0 0 5px rgba(64, 158, 255, 0.2);
}
</style>