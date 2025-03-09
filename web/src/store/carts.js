import { defineStore } from "pinia";
import { ref, computed } from "vue";
export const useCartStore = defineStore(
  "cart",
  () => {
    const cart = ref([]);
    const cartGoodsNum = computed(() =>
      cart.value.reduce((acc, item) => acc + item.num, 0)
    );
    const addCart = (goods) => {
      // id 存在则更新数量，否则添加
      const index = cart.value.findIndex((item) => item.id === goods.id);
      if (index !== -1) {
        cart.value[index].num += goods.num;
      } else {
        cart.value.push(goods);
      }
    };
    const removeCart = (goods) => {
      cart.value = cart.value.filter((item) => item.id !== goods.id);
    };
    const clearCart = () => {
      cart.value = [];
    };
    const updateCart = (goods) => {
      // 根据id找到对应的商品，然后更新数量
      const index = cart.value.findIndex((item) => item.id === goods.id);
      if (index !== -1) {
        cart.value[index].num = goods.num;
      }
    };
    return {
      cart,
      cartGoodsNum,
      addCart,
      removeCart,
      clearCart,
      updateCart,
    };
  },
  {
    persist: true,
  }
);
