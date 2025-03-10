<template>
  <div class="p-4" v-if="tableData.length > 0">
    <el-table
      v-if="tableData.length > 0"
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column prop="order_id" label="订单号" width="220" />
      <el-table-column prop="amount" label="金额" width="120">
        <template #default="scope">
          <el-tag type="success">￥{{ scope.row.amount }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="order_status" label="状态" width="120">
        <template #default="scope">
          <el-tag :type="getStatusTagType(scope.row.order_status)">
            {{ getStatusLabel(scope.row.order_status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="创建时间" width="180">
        <template #default="scope">
          {{ formatDate(scope.row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            type="primary"
            @click="handlePay(scope.row)"
            :disabled="scope.row.order_status !== 'pending'"
          >
            支付
          </el-button>
          <el-button
            type="danger"
            @click="handleDelete(scope.row)"
            :disabled="scope.row.order_status !== 'pending'"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 无数据时显示 -->
    <el-empty v-else description="暂无订单" class="mt-4">
      <el-button type="primary" @click="goShopping">去下单</el-button>
    </el-empty>

    <!-- 支付确认弹窗 -->
    <el-dialog v-model="payModalVisible" title="确认支付">
      <p>确定支付该订单吗？</p>
      <template #footer>
        <el-button @click="payModalVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmPayment">确认支付</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "@/store/users";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { getAllOrders, updateOrderStatus, deleteOrder } from "@/api/order";
import { showMessage } from "@/utils/message";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const router = useRouter();

const tableData = ref([]);
const payModalVisible = ref(false);
const selectedOrder = ref(null);

// 状态映射
const getStatusLabel = (status) => {
  return (
    { pending: "待支付", paid: "已支付", completed: "已完成" }[status] || "未知"
  );
};

// 状态颜色
const getStatusTagType = (status) => {
  return (
    { pending: "danger", paid: "success", completed: "info" }[status] || "info"
  );
};

// 处理支付
const handlePay = (row) => {
  selectedOrder.value = row;
  payModalVisible.value = true;
};

// 确认支付
const confirmPayment = async () => {
  if (!selectedOrder.value) return;

  try {
    const res = await updateOrderStatus(selectedOrder.value.order_id, {
      status: "paid",
    });

    if (res.code === 200) {
      showMessage("支付成功");
      payModalVisible.value = false;
      fetchOrders(); // 刷新数据
    } else {
      showMessage("支付失败", "error");
    }
  } catch (error) {
    showMessage("支付请求失败，请稍后重试", "error");
    console.error("支付失败", error);
  }
};

// 处理删除
const handleDelete = async (row) => {
  try {
    const res = await deleteOrder(row.order_id);
    if (res.code === 200) {
      showMessage("订单已删除");
      fetchOrders(); // 刷新数据
    }
  } catch (error) {
    showMessage("删除失败", "error");
  }
};

// 格式化时间
const formatDate = (date) => {
  return new Date(date).toLocaleString();
};

// 获取用户的所有订单
const fetchOrders = async () => {
  try {
    const res = await getAllOrders(user.value.id);
    tableData.value = res.data;
  } catch (error) {
    console.error("获取订单失败", error);
  }
};

// 跳转到购物页面
const goShopping = () => {
  router.push({ name: "GoodsList" });
};

onMounted(fetchOrders);
</script>

<style scoped>
.mt-4 {
  margin-top: 20px;
}
</style>
