<template>
  <a-table :columns="columns" :data-source="posts">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'title'"> 标题 </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'title'">
        <a>
          {{ record.title }}
        </a>
      </template>
      <template v-else-if="column.key === 'content'">
        <span>{{ record.content.slice(0, 30) }}</span>
      </template>
      <template v-else-if="column.key === 'createdAt'">
        <span>
          {{ formatTime(record.createdAt) }}
        </span>
      </template>
      <template v-else-if="column.key === 'updatedAt'">
        <span>
          {{ formatTime(record.updatedAt) }}
        </span>
      </template>

      <template v-else-if="column.key === 'action'">
        <span>
          <a-button size="small" @click="handleEdit(record)">编辑</a-button>
          <a-divider type="vertical" />
          <a-button danger size="small" @click="handleDelete(record.id)">删除</a-button>
        </span>
      </template>
    </template>
  </a-table>

  <a-modal v-model:open="open" title="编辑公告" @ok="handleOk">
    <a-form :model="newPost" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
      <a-form-item label="标题">
        <a-input v-model:value="newPost.title" />
      </a-form-item>
      <a-form-item label="内容">
        <a-textarea :rows="10" v-model:value="newPost.content" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import type { PostsReq, PostsVO } from "@/api/interfaces/posts";
import { getAllPosts, deletePostById, updatePostById } from "@/api/modules/posts";
import { formatTime } from "@/utils/time";
import { message } from "ant-design-vue";

const posts = ref<PostsVO[]>([]);
const newPost = ref<PostsReq>({
  id: 0,
  title: "",
  content: "",
});
const open = ref(false);

onMounted(async () => {
  const res = await getAllPosts();
  posts.value = res.data;
});

const columns = [
  { title: "标题", dataIndex: "title", key: "title" },
  { title: "内容", dataIndex: "content", key: "content" },
  { title: "创建时间", dataIndex: "createdAt", key: "createdAt" },
  { title: "更新时间", key: "updatedAt", dataIndex: "updatedAt" },
  { title: "操作", key: "action", dataIndex: "action" },
];

// 编辑公告，填充原有数据
const handleEdit = (record: PostsVO) => {
  newPost.value = { ...record }; // 复制对象，避免影响原数据
  open.value = true;
};

// 确认修改
const handleOk = async () => {
  try {
    const res = await updatePostById(newPost.value.id as number, newPost.value);
    message.success(res.msg);

    // 更新表格中的数据
    const index = posts.value.findIndex((item) => item.id === newPost.value.id);
    if (index !== -1) {
      posts.value[index] = { 
        id: newPost.value.id as number, 
        title: newPost.value.title, 
        content: newPost.value.content, 
        createdAt: posts.value[index].createdAt, // 保持原有创建时间
        updatedAt: new Date().toISOString() // 更新为当前时间
      };
    }

    open.value = false;
  } catch (err: any) {
    message.error(err);
  }
};

// 删除公告
const handleDelete = async (id: number) => {
  try {
    const res = await deletePostById(id);
    message.success(res.msg);
    posts.value = posts.value.filter((item) => item.id !== id);
  } catch (err: any) {
    message.error(err);
  }
};
</script>
