import { defineStore } from "pinia";

import type { User } from "@/api/interfaces/user";
import { ref } from "vue";

export const useUserStore = defineStore(
  "user",
  () => {
    const user = ref<User | null>(null);
    const setUser = (newUser: User) => {
      user.value = newUser;
    };
    const clearUser = () => {
      user.value = null;
    };
    return { user, setUser, clearUser };
  },
  {
    persist: true,
  }
);
