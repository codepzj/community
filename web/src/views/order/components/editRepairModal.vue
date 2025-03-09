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
      <el-form-item label="报修类型" prop="type_id">
        <el-radio-group v-model="form.type_id">
          <el-radio
            v-for="item in repairTypeList"
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }}
          </el-radio>
        </el-radio-group>
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
import { ref, computed, defineProps, defineEmits, reactive, watch, onMounted } from "vue";
import { updateRepair } from "@/api/repair";
import { showMessage } from "@/utils/message";
import { getRepairType } from "@/api/repair_type";
const props = defineProps({
  visible: Boolean,
  data: Object,
});
const emit = defineEmits(["update:visible", "update:row"]);

const repairTypeList = ref([]);
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
  type_id: 0,
  description: "",
});

watch(
  () => props.data,
  (newData) => {
    if (newData) {
      Object.assign(form, newData);
    }
  },
  { deep: true, immediate: true }
);

const handleClose = () => {
  visibleModel.value = false;
};

const handleSubmit = async () => {
  formRef.value.validate(async (valid) => {
    if (!valid) return;
    try {
      const res = await updateRepair(form);
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
  type_id: [{ required: true, message: "请选择报修类型", trigger: "change" }],
};

onMounted(async () => {
  const res = await getRepairType();
  repairTypeList.value = res.data;
});
</script>
