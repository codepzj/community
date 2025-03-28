<template>
  <div>
    <go-back title="申请报修" />
    <div class="p-4 border-2 rounded-lg">
      <el-form
        :model="form"
        ref="formRef"
        :rules="rules"
        label-width="auto"
        status-icon
        class="custom-form flex flex-col gap-2"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" class="custom-input" />
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="form.phone" class="custom-input" />
        </el-form-item>
        <el-form-item label="地址" prop="region">
          <el-select
            v-model="form.region"
            placeholder="请选择地址"
            class="custom-select"
          >
            <el-option label="晨曦苑" value="晨曦苑" />
            <el-option label="星河湾" value="星河湾" />
            <el-option label="锦云阁" value="锦云阁" />
            <el-option label="云栖湾" value="云栖湾" />
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="form.address" class="custom-input" />
        </el-form-item>
        <el-form-item label="申报时间" prop="report_date">
          <el-date-picker
            v-model="form.report_date"
            type="datetime"
            placeholder="请选择日期"
            class="custom-datepicker"
          />
        </el-form-item>
        <el-form-item label="报修类型" prop="type_id">
          <el-radio-group v-model="form.type_id" class="custom-checkbox-group">
            <el-radio
              v-for="item in repairTypeList"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="报修描述" prop="description">
          <el-input
            v-model="form.description"
            type="textarea"
            class="custom-textarea"
            :show-arrow="true"
            :maxlength="100"
            :show-word-limit="true"
            :rows="10"
          />
        </el-form-item>

        <div class="flex justify-end gap-2">
          <el-button type="primary" @click="onSubmit(formRef)">创建</el-button>
          <el-button @click="resetForm(formRef)">重置</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { showMessage } from "@/utils/message";
import { createRepair } from "@/api/repair";
import { useUserStore } from "@/store/users";
import { getRepairType } from "@/api/repair_type";
import GoBack from "@/components/goback.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const formRef = ref(null);
const userStore = useUserStore();
const repairTypeList = ref([]);
const form = reactive({
  user_id: userStore.user.id,
  name: "",
  phone: "",
  region: "",
  address: "",
  report_date: "",
  type_id: 0,
  description: "",
});

const validatePhone = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入电话"));
  } else if (!/^\d{11}$/.test(value)) {
    callback(new Error("请输入正确的手机号码"));
  } else {
    callback();
  }
};

const rules = {
  name: [
    { required: true, message: "请输入姓名", trigger: "blur" },
    { min: 2, max: 10, message: "请输入2-10个字符", trigger: "blur" },
  ],
  phone: [
    { required: true, message: "请输入电话", trigger: "blur" },
    { validator: validatePhone, trigger: "blur" },
  ],
  region: [{ required: true, message: "请选择地址", trigger: "change" }],
  address: [{ required: true, message: "请输入详细地址", trigger: "blur" }],
  report_date: [
    { type: "date", required: true, message: "请选择日期", trigger: "change" },
  ],
  type_id: [
    {
      required: true,
      message: "请选择报修类型",
      trigger: "change",
    },
  ],
};

const onSubmit = async (formEl) => {
  if (!formEl) return;

  await formEl.validate(async (valid) => {
    if (valid) {
      const res = await createRepair(form);
      showMessage(res.msg);
      router.push({ name: "RepairList", query: { type: "repair" } });
    } else {
      showMessage("请确保所有必填项都已填写", "error");
    }
  });
};

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};
onMounted(async () => {
  const res = await getRepairType();
  repairTypeList.value = res.data;
});
</script>

<style scoped>
.custom-input:focus,
.custom-select:focus,
.custom-datepicker:focus,
.custom-textarea:focus {
  border-color: #409eff;
}

/* 复选框组优化 */
.custom-checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

/* 让复选框 label 和对齐更美观 */
.custom-checkbox-group .el-checkbox {
  margin-right: 15px;
}
</style>
