<template>
  <div class="p-4">
    <go-back title="支付订单" />

    <el-table
      v-if="tableData.length"
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column prop="cart_id" label="订单号" width="100" />
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
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            v-if="scope.row.order_status === 'pending'"
            type="primary"
            @click="handlePay(scope.row)"
          >
            立即支付
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-empty v-else description="购物车为空" />

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
        <el-button
          type="primary"
          :disabled="!selectedPaymentMethod"
          @click="confirmPayment"
        >
          确认支付
        </el-button>
      </template>
    </el-dialog>

    <!-- 支付成功页面 -->
    <el-dialog v-model="successModalVisible" title="支付成功" width="400px">
      <el-result
        icon="success"
        title="支付成功"
        :sub-title="`即将跳转首页 (${countdown}s)`"
      >
        <template #extra>
          <el-button type="primary" @click="goHome">立即返回首页</el-button>
        </template>
      </el-result>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/store/users";
import GoBack from "@/components/goback.vue";
import wxIcon from "@/assets/wx.png";
import alipayIcon from "@/assets/alipay.png";
import cardIcon from "@/assets/card.png";
import cashIcon from "@/assets/cash.png";
import { getCart } from "@/api/cart";
import { getGoodsById } from "@/api/goods";
import {
  createOrder,
  checkOrderExist,
  updateOrderStatus,
  getOrderDetailById,
} from "@/api/order";
import { storeToRefs } from "pinia";

const route = useRoute();
const router = useRouter();
const cart_id = route.params.cart_id;
const tableData = ref([]);
const orderId = ref(null);
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

// 支付方式
const paymentMethods = ref([
  { id: "wechat", name: "微信支付", icon: wxIcon },
  { id: "alipay", name: "支付宝", icon: alipayIcon },
  { id: "card", name: "银行卡", icon: cardIcon },
  { id: "cash", name: "现金", icon: cashIcon },
]);

const payModalVisible = ref(false);
const successModalVisible = ref(false);
const selectedOrder = ref(null);
const selectedPaymentMethod = ref(null);
const countdown = ref(5);
let countdownTimer = null;

// 选择支付方式
const selectPayment = (id) => {
  selectedPaymentMethod.value = id;
};

// 点击支付按钮
const handlePay = (order) => {
  selectedOrder.value = order;
  payModalVisible.value = true;
};

// 确认支付
const confirmPayment = async () => {
  if (!selectedOrder.value || !selectedPaymentMethod.value) return;

  try {
    const res = await updateOrderStatus(orderId.value, { status: "paid" });

    if (res.code === 200) {
      ElMessage.success("订单支付成功");
      tableData.value[0].order_status = "paid";
      payModalVisible.value = false;
      showSuccessModal();
    } else {
      ElMessage.error("订单支付失败");
    }
  } catch (error) {
    ElMessage.error("支付请求失败，请稍后重试");
    console.error("支付失败", error);
  }
};

// 显示支付成功弹窗
const showSuccessModal = () => {
  successModalVisible.value = true;
  countdown.value = 5;

  countdownTimer = setInterval(() => {
    countdown.value--;
    if (countdown.value === 0) {
      clearInterval(countdownTimer);
      goHome();
    }
  }, 1000);
};

// 返回首页
const goHome = () => {
  clearInterval(countdownTimer);
  router.push("/");
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

// 获取商品价格
const getGoodsPriceById = async (id) => {
  const res = await getGoodsById(id);
  return res.data.price;
};

// 获取订单详情
const getOrderDetail = async (order_id) => {
  const res = await getOrderDetailById(order_id);
  return res.data;
};

// 获取购物车数据
const fetchTableData = async () => {
  try {
    const res = await getCart(cart_id);

    if (!Array.isArray(res.data)) {
      console.error("购物车数据格式不正确");
      return;
    }

    const goodsList = await Promise.all(
      res.data.map(async (item) => {
        const price = await getGoodsPriceById(item.goods_id);
        return { id: item.goods_id, price, count: item.goods_num };
      })
    );

    tableData.value = [
      {
        user_id: user.value.id,
        cart_id,
        amount: goodsList
          .reduce((acc, curr) => acc + curr.price * curr.count, 0)
          .toFixed(2),
        order_status: "pending",
      },
    ];

    const orderIsExist = await checkOrderExist(cart_id);
    if (orderIsExist.data.exist) {
      const order = await getOrderDetail(orderIsExist.data.order_id);
      orderId.value = order.order_id;
      tableData.value[0].order_status = order.order_status;
    } else {
      const order = await createOrder(tableData.value[0]);
      orderId.value = order.data.order_id;
    }
  } catch (error) {
    console.error("获取购物车失败", error);
  }
};

// 组件挂载时获取数据
onMounted(fetchTableData);
</script>

<style scoped>
/* 支付方式选择 */
.payment-options {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
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
