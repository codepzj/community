<template>
  <div>
    <el-skeleton :loading="loading" animated>
      <div
        v-if="goodsList.length > 0"
        class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
      >
        <el-card
          v-for="item in goodsList"
          :key="item.id"
          shadow="hover"
          class="min-h-[320px] flex flex-col justify-between"
        >
          <template #header>
            <div class="flex justify-between items-center px-2">
              <span class="text-base font-semibold truncate">{{ item.name }}</span>
              <span class="text-xs text-gray-500">{{ formatPrice(item.price) }}</span>
            </div>
          </template>

          <el-tooltip
            effect="dark"
            :content="item.description || '暂无描述'"
            placement="top-start"
          >
            <el-image
              class="rounded-md w-full h-[160px] object-cover"
              :src="baseUrl + item.image || defaultImage"
              :alt="item.name || '商品图片'"
              fit="cover"
            />
          </el-tooltip>

          <template #footer>
            <div class="flex items-center justify-between px-2 py-2">
              <el-tag size="small" type="info">{{ getGoodsTypeName(item.type_id) }}</el-tag>
              <div class="flex items-center gap-2">
                <el-input-number
                  v-model="item.num"
                  :min="1"
                  :max="100"
                  size="small"
                  class="w-20"
                  @change="handleNumChange(item)"
                />
                <el-tooltip content="加入购物车" placement="top">
                  <el-button
                    type="danger"
                    size="small"
                    circle
                    class="w-8 h-8 flex items-center justify-center"
                    @click="addGoodsToCart(item)"
                  >
                    <el-icon size="16"><ShoppingCartFull /></el-icon>
                  </el-button>
                </el-tooltip>
              </div>
            </div>
          </template>
        </el-card>
      </div>
      <el-empty v-else description="暂无商品" class="h-[calc(100vh-100px)]" />
    </el-skeleton>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { ShoppingCartFull } from "@element-plus/icons-vue";
import { getGoodsList } from "@/api/goods";
import { getRepairType } from "@/api/repair_type";
import { useUserStore } from "@/store/users";
import { useCartStore } from "@/store/carts";
import { storeToRefs } from "pinia";
import { showMessage } from "@/utils/message";

const baseUrl = import.meta.env.VITE_API_URL;
const defaultImage = "/images/default-goods.jpg";
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const cartStore = useCartStore();

const goodsList = ref([]);
const loading = ref(true);
const goodsTypeList = ref([]);

const formatPrice = (price) => `¥${parseFloat(price).toFixed(2)}`;

const addGoodsToCart = async (item) => {
  if (!user.value) return showMessage("请先登录", "error");
  if (item.num <= 0) return showMessage("商品数量必须大于 0", "error");

  cartStore.addCart({ ...item, num: item.num });
  showMessage("已添加到购物车", "success");
  await nextTick();
  item.num = 1;
};

const handleNumChange = (item) => {
  console.log(`商品 ${item.name} 数量变更为:`, item.num);
};

const getGoodsTypeName = (id) => {
  const goodsType = goodsTypeList.value.find((item) => item.id === id);
  return goodsType?.name || "未知类型";
};

onMounted(async () => {
  try {
    const [typeRes, goodsRes] = await Promise.all([getRepairType(), getGoodsList()]);
    goodsTypeList.value = typeRes.data || [];
    goodsList.value = Array.isArray(goodsRes.data)
      ? goodsRes.data.map((item) => ({ ...item, num: 1 }))
      : [];
  } catch (error) {
    console.error("数据加载失败:", error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.el-card {
  @apply border rounded-lg transition-all duration-200;
}

.el-card:hover {
  @apply shadow-md border-gray-200;
}

.el-image {
  @apply transition-transform duration-300;
}

.el-image:hover {
  @apply scale-105;
}

.el-input-number {
  @apply w-20;
}

.el-button {
  @apply p-0;
}

.el-tag {
  @apply text-xs px-2 py-0;
}
</style>