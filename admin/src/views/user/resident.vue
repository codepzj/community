<template>
  <a-table :columns="columns" :data-source="residentList" bordered>
    <template #headerCell="{ column }">
      <template v-if="column.key === 'username'"> 用户名 </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'username'">
        <a :href="'mailto:' + record.email" target="_blank" rel="noopener noreferrer">
          {{ record.username }}
        </a>
      </template>
      <template v-else-if="column.key === 'email'">
        <a :href="'mailto:' + record.email" target="_blank" rel="noopener noreferrer">
          {{ record.email }}
        </a>
      </template>
      <template v-else-if="column.key === 'phone'">
        <a :href="'tel:' + record.phone" target="_blank" rel="noopener noreferrer">
          {{ record.phone }}
        </a>
      </template>
      <template v-else-if="column.key === 'address'">
        <span>{{ record.address }}</span>
      </template>
      <template v-else-if="column.key === 'createdAt'">
        <span>{{ formatTime(record.createdAt) }}</span>
      </template>
      <template v-else-if="column.key === 'updatedAt'">
        <span>{{ formatTime(record.updatedAt) }}</span>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a-button size="small" type="primary" @click="handleEdit(record)">编辑</a-button>
          <a-divider type="vertical" />
          <a-button size="small" type="danger" @click="handleDelete(record.id)">删除</a-button>
          <a-divider type="vertical" />
          <a-button size="small" type="success" @click="handleCreatePayment(record.id)">创建缴费</a-button>
        </span>
      </template>
    </template>
  </a-table>

  <a-modal v-model:open="open" title="编辑用户" @ok="handleOk">
    <a-form
      :model="newResident"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-form-item label="邮箱">
        <a-input v-model:value="newResident.email" />
      </a-form-item>
      <a-form-item label="电话">
        <a-input v-model:value="newResident.phone" />
      </a-form-item>
      <a-form-item label="地址">
        <a-input v-model:value="newResident.address" />
      </a-form-item>
    </a-form>
  </a-modal>

  <a-modal v-model:open="openPayment" title="创建缴费" @ok="handleCreatePaymentOk">
    <a-form :model="newPayment" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
      <a-form-item label="水费">
        <a-input v-model:value="newPayment.water_fee" />
      </a-form-item>
      <a-form-item label="电费">
        <a-input v-model:value="newPayment.electricity_fee" />
      </a-form-item>
      <a-form-item label="物业费">
        <a-input v-model:value="newPayment.property_fee" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import type { ResidentVO, ResidentReq } from "@/api/interfaces/user";
import {
  getResidentList,
  deleteResidentById,
  updateResident,
} from "@/api/modules/user";
import { createPayment } from "@/api/modules/payments";
import type { paymentReq } from "@/api/interfaces/payments";
import { formatTime } from "@/utils/time";
import { message } from "ant-design-vue";

const residentList = ref<ResidentVO[]>([]);
const newResident = ref<ResidentReq>({
  id: 0,
  email: "",
  phone: "",
  address: "",
});
const open = ref(false);
const openPayment = ref(false);
const newPayment = ref<paymentReq>({
  resident_id: 0,
  water_fee: 10.00,
  electricity_fee: 10.00,
  property_fee: 10.00,
});
onMounted(async () => {
  const res = await getResidentList();
  residentList.value = res.data;
});

const columns = [
  { title: "用户名", dataIndex: "username", key: "username" },
  { title: "邮箱", dataIndex: "email", key: "email" },
  { title: "电话", dataIndex: "phone", key: "phone" },
  { title: "地址", dataIndex: "address", key: "address" },
  { title: "创建时间", dataIndex: "createdAt", key: "createdAt" },
  { title: "更新时间", key: "updatedAt", dataIndex: "updatedAt" },
  { title: "操作", key: "action", dataIndex: "action" },
];

const handleEdit = (record: ResidentVO) => {
  newResident.value = { ...record };
  open.value = true;
};

const handleOk = async () => {
  try {
    const res = await updateResident(newResident.value);
    message.success(res.msg);
    // 刷新列表
    const res2 = await getResidentList();
    residentList.value = res2.data;

    // 关闭弹窗
    open.value = false;
  } catch (err: any) {
    message.error(err);
  }
};

const handleDelete = async (id: number) => {
  try {
    const res = await deleteResidentById(id);
    message.success(res.msg);
    residentList.value = residentList.value.filter((item) => item.id !== id);
  } catch (err: any) {
    message.error(err);
  }
};

const handleCreatePayment = (id: number) => {
  newPayment.value.resident_id = id;
  openPayment.value = true;
};

const handleCreatePaymentOk = async () => {
  try {
    const res = await createPayment(newPayment.value);
    message.success(res.msg);

    // 关闭弹窗
    openPayment.value = false;
  } catch (err: any) {
    message.error(err);
  }
};
</script>
