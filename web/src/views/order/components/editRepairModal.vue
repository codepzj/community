<template>
  <el-dialog v-model="visibleModel" title="编辑报修订单" width="500px">
    <el-form :model="form" ref="formRef" :rules="rules" label-width="80px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="地址" prop="region">
        <el-select v-model="form.region" placeholder="请选择地址">
          <el-option label="晨曦苑" value="晨曦苑" />
          <el-option label="星河湾" value="星河湾" />
          <el-option label="锦云阁" value="锦云阁" />
          <el-option label="云栖湾" value="云栖湾" />
        </el-select>
      </el-form-item>
      <el-form-item label="详细地址" prop="address">
        <el-input v-model="form.address" />
      </el-form-item>
      <el-form-item label="报修类型" prop="type">
        <el-checkbox-group v-model="form.type">
          <el-checkbox value="水管漏水">水管漏水</el-checkbox>
          <el-checkbox value="电路故障">电路故障</el-checkbox>
          <el-checkbox value="下水道堵塞">下水道堵塞</el-checkbox>
          <el-checkbox value="网线故障">网线故障</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="form.description" type="textarea" :rows="4" />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleSubmit">保存</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits, reactive, watch } from "vue";
import { updateRepair } from "@/api/repair";
import { showMessage } from "@/utils/message";
const props = defineProps({
  visible: Boolean,
  data: Object,
});
const emit = defineEmits(["update:visible", "update:row"]);

const visibleModel = computed({
  get: () => props.visible,
  set: (value) => emit("update:visible", value),
});

const formRef = ref(null);
const form = reactive({
  id: 0,
  name: "",
  phone: "",
  region: "",
  address: "",
  type: [],
  description: "",
});

watch(
  () => props.data,
  (newData) => {
    if (newData) {
      console.log(newData);
      Object.assign(form, {
        id: newData.id || 0,
        name: newData.name || "",
        phone: newData.phone || "",
        region: newData.region || "",
        address: newData.address || "",
        type: Array.isArray(newData.type) ? newData.type : [],
        description: newData.description || "",
      });
    }
  },
  { deep: true, immediate: true }
);

const handleClose = () => {
  visibleModel.value = false;
};

const convertFormToUpdateRepair = computed(() => {
  return {
    ...form,
    type: form.type.join(","),
  };
});

const handleSubmit = async () => {
  formRef.value.validate(async (valid) => {
    if (!valid) return;
    try {
      const res = await updateRepair(convertFormToUpdateRepair.value);
      console.log(res);
      emit("update:row", res.data);
      visibleModel.value = false;
      showMessage("编辑成功");
    } catch (error) {
      showMessage(error.message, "error");
    }
  });
};

const rules = {
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
  region: [{ required: true, message: "请选择地址", trigger: "change" }],
  address: [{ required: true, message: "请输入详细地址", trigger: "blur" }],
  type: [{ required: true, message: "请选择报修类型", trigger: "change" }],
};
</script>
