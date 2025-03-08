<template>
  <div class="p-4">
    <go-back title="订单列表" />
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="phone" label="手机号" width="180" />
      <el-table-column prop="address" label="地址" width="180" />
      <el-table-column prop="type" label="报修类型">
        <template #default="scope">
          <span
            v-for="item in scope.row.type.split(',')"
            :key="item"
            class="mr-2"
          >
            <el-tag>{{ item }}</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述" />
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <el-tag type="danger">待支付</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" @click="handlePay(scope.row)"
            >立即支付</el-button
          >
          <el-button type="primary" @click="handleEdit(scope.row)" :disabled="scope.row.status !== 'in_pay'"
            >编辑</el-button
          >
          <el-button type="danger" @click="handleDelete(scope.row)" :disabled="scope.row.status !== 'in_pay'"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑模态框 -->
    <edit-repair-modal
      :visible="editRepairModalVisible"
      :data="editRepairModalData"
      @update:visible="editRepairModalVisible = false"
      @update:row="refreshTable"
    />
  </div>
</template>

<script setup>
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { getRepairListInPayByUserId } from "@/api/repair";
import GoBack from "@/components/goback.vue";
import EditRepairModal from "../components/editRepairModal.vue";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const tableData = ref([]);
const editRepairModalVisible = ref(false);
const editRepairModalData = ref(null);

onMounted(() => {
  getRepairList();
});

// 处理编辑
const handleEdit = (row) => {
  editRepairModalData.value = {
    ...row,
    type: row.type ? row.type.split(",") : [], // 确保 type 是数组
  };
  editRepairModalVisible.value = true;
};

// 处理删除
const handleDelete = (row) => {
  console.log("删除订单：", row);
};

// 获取报修订单列表
const getRepairList = async () => {
  const res = await getRepairListInPayByUserId(user.value.id);
  tableData.value = res.data;
};

// 从子组件获取更新后的数据
const refreshTable = (row) => {
  console.log("更新后的数据：", row);
  const index = tableData.value.findIndex((item) => item.id === row.id);
  if (index !== -1) {
    tableData.value[index] = row;
  }
};
</script>
