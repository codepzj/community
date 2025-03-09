<template>
  <div>
    <el-skeleton :loading="loading" animated>
      <div
        class="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4"
        v-if="goodsList.length > 0"
      >
        <el-card
          v-for="item in goodsList"
          :key="item.id"
          shadow="hover"
          class="flex flex-col justify-between min-h-[400px]"
        >
          <template #header>
            <div class="flex justify-between items-center">
              <span class="text-lg font-bold">{{ item.name }}</span>
              <span class="text-sm text-gray-500">{{
                formatPrice(item.price)
              }}</span>
            </div>
          </template>

          <div class="flex flex-col justify-center items-center">
            <el-image
              class="rounded-lg shadow-sm w-full h-[200px]"
              fit="cover"
              :src="item.image || defaultImage"
              :alt="item.name || '商品图片'"
            />
            <el-divider />
            <el-descriptions :column="1" border>
              <el-descriptions-item label="商品描述" class="text-center">
                {{ formatDescription(item.description) }}
              </el-descriptions-item>
            </el-descriptions>
          </div>

          <template #footer>
            <div class="flex items-center justify-between w-full">
              <div>
                <el-tag>{{ getGoodsTypeName(item.type_id) }}</el-tag>
              </div>
              <div class="flex items-center gap-2">
                <el-input-number
                  v-model="item.num"
                  :min="1"
                  :max="100"
                  size="small"
                  class="custom-input-number"
                  @change="handleNumChange(item)"
                />
                <el-tooltip content="加入购物车" placement="top">
                  <el-button
                    type="danger"
                    size="small"
                    round
                    class="add-cart-btn"
                    @click="addGoodsToCart(item)"
                  >
                    <el-icon><ShoppingCartFull /></el-icon>
                  </el-button>
                </el-tooltip>
              </div>
            </div>
          </template>
        </el-card>
      </div>
      <div v-else class="flex justify-center items-center h-[calc(100vh-100px)]">
        <el-empty description="暂无商品" />
      </div>
    </el-skeleton>
  </div>
</template>

<script setup>
import { getGoodsList } from "@/api/goods";
import { ref, onMounted, nextTick } from "vue";
import { ShoppingCartFull } from "@element-plus/icons-vue";
import { useUserStore } from "@/store/users";
import { useCartStore } from "@/store/carts";
import { storeToRefs } from "pinia";
import { showMessage } from "@/utils/message";
import { getRepairType } from "@/api/repair_type";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const cartStore = useCartStore();
const goodsList = ref([]);
const loading = ref(true);
const defaultImage = "/images/default-goods.jpg";
const goodsTypeList = ref([]);
const formatPrice = (price) => `¥${parseFloat(price).toFixed(2)}`;
const formatDescription = (desc) =>
  !desc ? "暂无描述" : desc.length < 20 ? desc.padEnd(20, "…") : desc;

const addGoodsToCart = async (item) => {
  if (!user.value) {
    showMessage("请先登录", "error");
    return;
  }

  if (item.num <= 0) {
    showMessage("商品数量必须大于 0", "error");
    return;
  }

  // 提交购物车时，num 是响应式的
  cartStore.addCart({ ...item, num: item.num });
  showMessage("已添加到购物车", "success");

  // 使用 nextTick 确保 Vue 完成 DOM 更新后再修改 num
  await nextTick();
  item.num = 1;
};

// 监听数量变化
const handleNumChange = (item) => {
  console.log(`商品 ${item.name} 数量变更为:`, item.num);
};

const getGoodsTypeName = (id) => {
  const goodsType = goodsTypeList.value.find((item) => item.id === id);
  return goodsType ? goodsType.name : "";
};

onMounted(async () => {
  const res = await getRepairType();
  goodsTypeList.value = res.data;
});

onMounted(async () => {
  try {
    const res = await getGoodsList();
    goodsList.value = Array.isArray(res.data)
      ? res.data.map((item) => ({ ...item, num: 1 })) // 确保 num 是响应式的
      : [];
    console.log(goodsList.value);
  } catch (error) {
    console.error("获取商品列表失败:", error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
/* 让 input-number 更紧凑 */
:deep(.el-input-number) {
  width: 80px;
  margin-right: 8px;
}

/* 让按钮更紧凑 */
.add-cart-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

/* 让按钮的 icon 居中 */
.add-cart-btn :deep(.el-icon) {
  font-size: 18px;
}
</style>
