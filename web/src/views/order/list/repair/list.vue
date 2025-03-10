<template>
  <div class="p-4" v-if="tableData.length > 0">
    <el-table
      v-if="tableData.length"
      :data="tableData"
      border
      size="small"
      style="width: 100%"
    >
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="phone" label="手机号" width="180" />
      <el-table-column prop="address" label="地址" width="180" />
      <el-table-column prop="type" label="报修类型">
        <template #default="scope">
          <el-tag>{{ getRepairNameById(scope.row.type_id) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述" />
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <el-tag :type="getStatusTagType(scope.row.status)">
            {{ getStatusText(scope.row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleShowStep(scope.row)">
            查看进度
          </el-button>
          <el-button
            type="primary"
            size="small"
            @click="handleEdit(scope.row)"
            :disabled="scope.row.status !== 'pending'"
          >编辑</el-button>
          <el-button
            type="danger"
            size="small"
            @click="handleDelete(scope.row)"
            :disabled="scope.row.status !== 'pending'"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 数据为空时显示 -->
    <el-empty
      v-else
      description="暂无报修订单"
      :image-size="120"
      class="empty-container"
    >
      <el-button type="primary" @click="getRepairList">刷新数据</el-button>
    </el-empty>

    <!-- 编辑模态框 -->
    <edit-repair-modal
      :visible="editRepairModalVisible"
      :data="editRepairModalData"
      @update:visible="editRepairModalVisible = false"
      @update:row="refreshTable"
    />

    <!-- 进度模态框 -->
    <el-dialog v-model="stepDialogVisible" title="报修进度" width="600px">
      <el-steps :active="getStepIndex(currentRow?.status)" finish-status="success" align-center>
        <el-step title="待审核" description="您的报修已提交，等待审核。" />
        <el-step title="处理中" description="您的报修正在处理中。" />
        <el-step title="已完成" description="报修已完成，感谢您的耐心等待。" />
      </el-steps>
    </el-dialog>
  </div>
</template>

<script setup>
import { useUserStore } from "@/store/users";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { getRepairListByUserId, deleteRepair } from "@/api/repair";
import { getRepairType } from "@/api/repair_type";
import EditRepairModal from "../../components/editRepairModal.vue";
import { showMessage } from "@/utils/message";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const tableData = ref([]);
const editRepairModalVisible = ref(false);
const editRepairModalData = ref(null);
const repairTypeList = ref([]);

const stepDialogVisible = ref(false);
const currentRow = ref(null);

onMounted(async () => {
  await fetchRepairTypes();
  await getRepairList();
});

// 获取报修类型
const fetchRepairTypes = async () => {
  const res = await getRepairType();
  repairTypeList.value = res.data;
};

// 根据 ID 获取报修类型名称
const getRepairNameById = (id) => {
  const repairType = repairTypeList.value.find((item) => item.id === id);
  return repairType ? repairType.name : "";
};

// 根据状态获取状态文本
const getStatusText = (status) => {
  const statusMap = {
    pending: "待审核",
    in_progress: "处理中",
    completed: "已完成",
  };
  return statusMap[status] || "未知";
};

// 获取状态对应的 `el-tag` 颜色
const getStatusTagType = (status) => {
  const statusTypeMap = {
    pending: "warning",
    in_progress: "primary",
    completed: "success",
  };
  return statusTypeMap[status] || "info";
};

// 获取状态在 Step 组件中的索引
const getStepIndex = (status) => {
  const stepMap = {
    pending: 0,
    in_progress: 1,
    completed: 2,
  };
  return stepMap[status] || 0;
};

// 获取报修订单列表
const getRepairList = async () => {
  try {
    const res = await getRepairListByUserId(user.value.id);
    tableData.value = res.data;
  } catch (error) {
    showMessage("获取数据失败", "error");
  }
};

// 处理查看进度
const handleShowStep = (row) => {
  currentRow.value = row;
  stepDialogVisible.value = true;
};

// 处理编辑
const handleEdit = (row) => {
  editRepairModalVisible.value = true;
  editRepairModalData.value = row;
};

// 处理删除
const handleDelete = async (row) => {
  try {
    const res = await deleteRepair(row.id);
    if (res.code === 200) {
      showMessage("删除成功");
      await getRepairList();
    }
  } catch (error) {
    showMessage("删除失败", "error");
  }
};

// 更新表格数据
const refreshTable = (row) => {
  const index = tableData.value.findIndex((item) => item.id === row.id);
  if (index !== -1) {
    tableData.value[index] = row;
  }
};
</script>

<style scoped>
.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}
</style>
