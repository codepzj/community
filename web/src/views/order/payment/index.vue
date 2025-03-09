<template>
  {{ cart_id }}
  <div class="p-4">
    <go-back title="支付订单" />
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="订单号" width="100" />
      <el-table-column prop="amount" label="金额" width="120">
        <template #default="scope">
          <el-tag type="success">￥{{ scope.row.amount }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="120">
        <template #default="scope">
          <el-tag :type="getStatusTagType(scope.row.status)">
            {{ getStatusLabel(scope.row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            v-if="scope.row.status === 'pending'"
            type="primary"
            @click="handlePay(scope.row)"
            >立即支付</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 支付方式选择弹窗 -->
    <el-dialog v-model="payModalVisible" title="确认支付">
      <div class="payment-options">
        <el-card
          v-for="payment in paymentMethods"
          :key="payment.id"
          class="payment-card"
          :class="{ selected: selectedPaymentMethod === payment.id }"
          @click="selectPayment(payment.id)"
        >
          <img :src="payment.icon" class="payment-icon" />
          <span>{{ payment.name }}</span>
        </el-card>
      </div>
      <template #footer>
        <el-button @click="payModalVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmPayment">确认支付</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import GoBack from "@/components/goback.vue";
import wxIcon from "@/assets/wx.png";
import alipayIcon from "@/assets/alipay.png";
import cardIcon from "@/assets/card.png";
import cashIcon from "@/assets/cash.png";
import { getCart } from "@/api/cart";
const route = useRoute();
const cart_id = route.params.cart_id;
// 假数据
const tableData = ref([
  { id: 1001, amount: 199.99, status: "pending" },
  { id: 1002, amount: 89.5, status: "paid" },
  { id: 1003, amount: 300.0, status: "pending" },
  { id: 1004, amount: 159.99, status: "completed" },
]);

// 支付方式
const paymentMethods = ref([
  { id: "wechat", name: "微信支付", icon: wxIcon },
  { id: "alipay", name: "支付宝", icon: alipayIcon },
  { id: "card", name: "银行卡", icon: cardIcon },
  { id: "cash", name: "现金", icon: cashIcon },
]);

const payModalVisible = ref(false);
const selectedOrder = ref(null);
const selectedPaymentMethod = ref(null);

// 选择支付方式
const selectPayment = (id) => {
  selectedPaymentMethod.value = id;
};

// 点击支付按钮
const handlePay = (order) => {
  selectedOrder.value = order;
  payModalVisible.value = true;
};

// 确认支付（本地更新）
const confirmPayment = () => {
  if (!selectedOrder.value || !selectedPaymentMethod.value) return;
  selectedOrder.value.status = "paid"; // 仅更新本地数据
  payModalVisible.value = false;
};

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
onMounted(async () => {
  try {
    const res = await getCart(cart_id);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
});
</script>

<style scoped>
/* 支付方式选择 */
.payment-options {
  display: flex;
  gap: 15px;
  justify-content: center;
}

/* 单个支付方式卡片 */
.payment-card {
  width: 120px;
  height: 120px;
  cursor: pointer;
  text-align: center;
  border-radius: 10px;
  transition: all 0.3s;
  border: 2px solid transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* 选中时高亮 */
.payment-card.selected {
  border: 2px solid #409eff;
  background-color: rgba(64, 158, 255, 0.1);
}

/* 支付方式图标 */
.payment-icon {
  width: 40px;
  height: 40px;
  margin-bottom: 8px;
}
</style>
