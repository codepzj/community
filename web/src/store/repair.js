import { defineStore } from "pinia";

export const useRepairStore = defineStore("repair", () => {
  const active = ref(0);

  return {
    active,
  };
});