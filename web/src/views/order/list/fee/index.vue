<template>
  <div class="payment-list-container p-4">
    <el-table :data="paymentList" border style="width: 100%">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="water_fee" label="水费" />
      <el-table-column prop="electricity_fee" label="电费" />
      <el-table-column prop="property_fee" label="物业费" />
      <el-table-column prop="createdAt" label="创建时间" />
      <el-table-column prop="updatedAt" label="更新时间" />
      <el-table-column prop="payment_status" label="状态" >
        <template #default="scope">
          <el-tag :type="getStatusTagType(scope.row.payment_status)">
            {{ getStatusText(scope.row.payment_status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
            <el-button type="primary" size="small" @click="handleOpenDialog(scope.row)" :disabled="scope.row.payment_status === 'paid'">支付</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" title="支付" width="30%">
        <div>你确定要支付吗？</div>
        <template #footer>
            <el-button type="primary" @click="handlePay">确定</el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
        </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { getPaymentListByResidentId, updatePaymentStatusById } from "@/api/payment";
import { ref, onMounted } from "vue";
import { useUserStore } from "@/store/users";
import dayjs from 'dayjs';

const userStore = useUserStore();
const residentId = userStore.user.id;

const paymentList = ref([]);
const dialogVisible = ref(false);

const getStatusTagType = (status) => {
  if (status === 'pending') {
    return 'warning';
  } else if (status === 'paid') {
    return 'success';
  }
};

const getStatusText = (status) => {
  if (status === 'pending') {
    return '未支付';
  } else if (status === 'paid') {
    return '已支付';
  }
};

const tempPayment = ref({});

const handleOpenDialog = (row) => {
    dialogVisible.value = true;
    tempPayment.value = row;
}

const handlePay = async () => {
    const res = await updatePaymentStatusById(tempPayment.value.id);
    console.log(res);
    dialogVisible.value = false;
    await onFetchPaymentList();
}
const onFetchPaymentList = async () => {
  const res = await getPaymentListByResidentId(residentId);
  paymentList.value = res.data.map(payment => {
    return {
      ...payment,
      createdAt: dayjs(payment.createdAt).format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: dayjs(payment.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
    };
  });
}

onMounted(async () => {
  await onFetchPaymentList();
});
</script>