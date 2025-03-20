<template>
  <div class="p-4">
    <h1 class="text-lg font-bold mb-4">审核管理</h1>
    <a-table
      :columns="columns"
      :data-source="pendingRepair"
      row-key="id"
      bordered
    >
      <template #bodyCell="{ column, record }">
        <a-tag color="blue" v-if="column.dataIndex === 'type_id'">{{
          repairType.find((item) => item.id === record.type_id)?.name
        }}</a-tag>
        <span v-if="column.dataIndex === 'name'">{{ record.name }}</span>
        <span v-if="column.dataIndex === 'phone'">{{ record.phone }}</span>
        <span v-if="column.dataIndex === 'region'">{{ record.region }}</span>
        <span v-if="column.dataIndex === 'address'">{{ record.address }}</span>
        <span v-if="column.dataIndex === 'report_date'">{{
          record.report_date
        }}</span>
        <span v-if="column.dataIndex === 'description'">{{
          record.description
        }}</span>

        <span v-if="column.dataIndex === 'status'">
          <a-tag :color="record.status === 'pending' ? 'orange' : 'green'">
            {{ record.status === "pending" ? "待审核" : "已处理" }}
          </a-tag>
        </span>
        <span v-if="column.dataIndex === 'action'">
          <a-button
            :disabled="record.status === 'in_progress'"
            type="link"
            @click="approveRepair(record.id)"
            >通过</a-button
          >
          <a-button type="link" @click="completeRepair(record.id)"
            >完成</a-button
          >
        </span>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { getPendingRepair, checkRepair } from "@/api/modules/review";
import { getRepairTypeList } from "@/api/modules/repair_type";
import { ref, onMounted } from "vue";
import { message } from "ant-design-vue";
import type { RepairTypeVO } from "@/api/interfaces/repair_type";

const repairType = ref<RepairTypeVO[]>([]);

const pendingRepair = ref([]);
const columns = [
  { title: "申报类型", dataIndex: "type_id" },
  { title: "申报人", dataIndex: "name" },
  { title: "联系电话", dataIndex: "phone" },
  { title: "区域", dataIndex: "region" },
  { title: "地址", dataIndex: "address" },
  { title: "申报日期", dataIndex: "report_date" },
  { title: "申报描述", dataIndex: "description" },
  { title: "状态", dataIndex: "status" },
  { title: "操作", dataIndex: "action" },
];

onMounted(async () => {
  const res = await getRepairTypeList();
  if (res.code === 200) {
    repairType.value = res.data;
  } else {
    message.error(res.msg);
  }
});

onMounted(async () => {
  const res = await getPendingRepair();
  if (res.code === 200) {
    pendingRepair.value = res.data;
  } else {
    message.error(res.msg);
  }
});

// 审核通过
const approveRepair = async (id: number) => {
  try {
    const res = await checkRepair(id, { status: "in_progress" });
    if (res.code === 200) {
      // 更新申报表状态
      const updateRes = await getPendingRepair();
      pendingRepair.value = updateRes.data;
      message.success("审核通过");
    } else {
      message.error(res.msg);
    }
  } catch (error) {
    message.error("审核失败");
  }
};

// 完成
const completeRepair = async (id: number) => {
  try {
    const res = await checkRepair(id, { status: "completed" });
    if (res.code === 200) {
      message.success("申报处理完成");
      pendingRepair.value = pendingRepair.value.filter(
        (item: any) => item.id !== id
      );
    } else {
      message.error(res.msg);
    }
  } catch (error) {
    message.error("申报处理失败");
  }
};
</script>
