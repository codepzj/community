import { useUserStore } from "@/store/users";
import { useCartStore } from "@/store/carts";

const clearStorage = () => {
  const userStore = useUserStore();
  const cartStore = useCartStore();
  userStore.setUser(null);
  cartStore.clearCart();
};

export default clearStorage;
