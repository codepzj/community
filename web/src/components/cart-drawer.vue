<template>
  <el-drawer
    v-model="props.drawerVisible"
    title="我的购物车"
    :direction="direction"
    :before-close="handleClose"
    class="custom-drawer"
  >
    <div v-if="cart.length" class="space-y-4">
      <div
        v-for="item in cart"
        :key="item.id"
        class="flex items-center p-3 bg-white rounded-lg shadow-sm border border-gray-200"
      >
        <!-- 商品图片 -->
        <el-image
          class="w-20 h-20 rounded-lg shadow-sm"
          :src="item.image"
          :alt="item.name"
          fit="cover"
        />

        <!-- 商品信息 -->
        <div class="ml-4 flex-1">
          <p class="text-lg font-medium">{{ item.name }}</p>
          <p class="text-sm text-gray-500">{{ item.price }}</p>
          <div class="flex items-center mt-2 space-x-2">
            <el-input-number
              v-model="item.num"
              :min="1"
              :max="100"
              size="small"
              class="w-24"
            />
            <el-button type="danger" size="small" @click="handleDelete(item)">
              删除
            </el-button>
          </div>
        </div>
      </div>
      <div class="absolute w-full bottom-0 p-6">
        <div class="flex justify-between space-x-4">
          <div class="flex items-center">
            <p class="text-lg font-bold text-gray-800">总价：</p>
            <p class="text-lg font-semibold text-red-600 ml-2">
              ￥{{ totalPrice }} 元
            </p>
          </div>
          <div>
            <el-button
              type="danger"
              @click="handleClearCart"
              class="transition duration-200 hover:bg-red-600 hover:text-white"
              >清空购物车</el-button
            >
            <el-button
              type="success"
              @click="handlePay"
              class="transition duration-200 hover:bg-green-600 hover:text-white"
              >去支付</el-button
            >
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center text-gray-500 mt-10">
      🛒 购物车空空如也，快去选购吧！
    </div>
  </el-drawer>
</template>

<script setup>
import { ref, computed } from "vue";
import { useCartStore } from "@/store/carts";
import { storeToRefs } from "pinia";
import { showMessage } from "@/utils/message";
import { useRouter } from "vue-router";

const props = defineProps({
  drawerVisible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:drawerVisible"]);

const router = useRouter();
const cartStore = useCartStore();
const { cart } = storeToRefs(cartStore);
const direction = ref("rtl");

const totalPrice = computed(() => {
  return cart.value
    .reduce((total, item) => total + item.price * item.num, 0)
    .toFixed(2);
});

const handleDelete = (item) => {
  cartStore.removeCart(item);
};

const handleClose = () => {
  emit("update:drawerVisible", false);
};

const handleClearCart = () => {
  cartStore.clearCart();
  showMessage("购物车已清空");
};

const handlePay = () => {
  emit("update:drawerVisible", false);
  setTimeout(() => {
    router.push({ name: "OrderPayment" });
  }, 1000);
};
</script>

<style scoped>
/* 让购物车侧边栏更加现代 */
.custom-drawer :deep(.el-drawer__header) {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  padding-bottom: 12px;
  border-bottom: 1px solid #eee;
}

/* 让输入框更紧凑 */
:deep(.el-input-number) {
  width: 100px;
}
</style>
