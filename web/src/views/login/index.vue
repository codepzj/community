<template>
  <div class="form-container">
    <el-form
      ref="formRef"
      :model="loginForm"
      label-width="auto"
      class="login-form"
      :rules="formRules"
      :style="{ width: '400px' }"
    >
      <div class="text-2xl font-bold text-center mb-4">登录</div>
      <el-form-item prop="username" label="用户名">
        <el-input v-model="loginForm.username" />
      </el-form-item>

      <el-form-item prop="password" label="密码">
        <el-input v-model="loginForm.password" type="password" show-password />
      </el-form-item>

      <el-form-item class="flex justify-center">
        <el-button type="primary" @click="submitForm(formRef)">登录</el-button>
        <el-button @click="resetForm(formRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { LoginAPI } from "@/api/user";
import { showMessage } from "@/utils/message";

const formRef = ref(null);
const loginForm = reactive({
  username: "",
  password: "",
});

// 表单验证规则
const formRules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    {
      min: 3,
      max: 20,
      message: "用户名长度应为 3-20 个字符",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      min: 6,
      max: 20,
      message: "密码长度应为 6-20 个字符",
      trigger: "blur",
    },
  ],
};

const submitForm = async (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    console.log(valid);
    if (!valid) {
      showMessage("请输入正确的用户名和密码", "error");
      return;
    } else {
      LoginAPI(loginForm)
        .then((res) => {
          console.log(res);
          showMessage("登录成功");
        })
        .catch((error) => {
          showMessage(error, "error");
        });
    }
  });
};

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style lang="scss" scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5; /* 添加背景色提升视觉效果 */
}

.login-form {
  padding: 30px;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background: #fff;
}

:deep(.el-form-item) {
  margin-bottom: 20px;
  margin-top: 20px;
}

:deep(.el-form-item__content) {
  display: flex;
  justify-content: center;
}

/* 优化按钮间距 */
:deep(.el-button + .el-button) {
  margin-left: 10px;
}
</style>
