<template>
  <el-table :data="tableData" border stripe size="large" style="width: 100%">
    <el-table-column prop="name" label="姓名" min-width="150" />
    <el-table-column prop="phone" label="手机号" min-width="150" />
    <el-table-column prop="address" label="地址" min-width="200" />

    <el-table-column prop="type" label="报修类型" min-width="200">
      <template #default="{ row }">
        <el-tag v-for="item in row.type.split(',')" :key="item" class="mr-1">
          {{ item }}
        </el-tag>
      </template>
    </el-table-column>

    <el-table-column prop="description" label="描述" min-width="250">
      <template #default="{ row }">
        <div v-if="row.description">
          {{ row.description }}
        </div>
        <div v-else>空空如也~</div>
      </template>
    </el-table-column>

    <el-table-column prop="status" label="状态" min-width="120">
      <template #default="{ row }">
        <el-tag :type="statusTagType[row.status] || 'danger'">
          {{ statusText[row.status] || "未知" }}
        </el-tag>
      </template>
    </el-table-column>

    <el-table-column label="操作" min-width="180" align="center">
      <template #default="{ row }">
        <el-button size="small" type="primary" @click="handleEdit(row)">
          <el-icon><Edit /></el-icon> 编辑
        </el-button>
        <el-button size="small" type="danger" @click="handleDelete(row)">
          <el-icon><Delete /></el-icon> 删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { useUserStore } from "@/store/users";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { getRepairListByUserId } from "@/api/repair";
import { Edit, Delete } from "@element-plus/icons-vue";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const tableData = ref([]);

// 状态文本映射
const statusText = {
  in_pay: "待支付",
  pending: "待审核",
  in_progress: "处理中",
  completed: "已完成",
};

// 状态颜色映射
const statusTagType = {
  null: "info",
  pending: "warning",
  in_progress: "primary",
  completed: "success",
};

const getRepairList = async () => {
  try {
    const res = await getRepairListByUserId(user.value.id);
    tableData.value = res.data;
  } catch (error) {
    console.error("获取报修列表失败:", error);
  }
};

onMounted(getRepairList);
</script>

<style scoped>
.el-tag {
  margin-right: 4px;
}
</style>
