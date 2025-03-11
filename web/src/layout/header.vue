<template>
  <el-menu
    mode="horizontal"
    :ellipsis="false"
    class="flex items-center justify-between"
  >
    <div class="flex items-center justify-end">
      <el-menu-item @click="router.push('/')">
        <img
          style="width: 100px"
          src="https://element-plus.org/images/element-plus-logo.svg"
          alt="Element logo"
        />
      </el-menu-item>
    </div>
    <div class="flex items-center justify-center">
      <el-menu-item @click="router.push('/goods')"> 物资采购 </el-menu-item>
      <el-menu-item @click="router.push('/order/repair')">
        维修订单
      </el-menu-item>
      <el-menu-item @click="router.push('/order/shopping')">
        采购订单
      </el-menu-item>
      <el-menu-item @click="router.push('/posts')"> 居民论坛 </el-menu-item>
      <el-badge :value="cartGoodsNum">
        <el-button
          circle
          size="large"
          :icon="ShoppingCart"
          @click="cartDrawerVisible = true"
        ></el-button>
      </el-badge>
      <el-sub-menu v-if="!user" index="1">
        <template #title><el-avatar :icon="UserFilled" /></template>
        <el-menu-item index="1-1" @click="loginDialogVisible = true"
          >登录</el-menu-item
        >
        <el-menu-item index="1-2" @click="registerDialogVisible = true"
          >注册</el-menu-item
        >
      </el-sub-menu>
      <el-sub-menu v-else index="2">
        <template #title
          ><el-avatar v-if="user.avatar" :src="user.avatar" />
          <el-avatar v-else>
            {{ user.username.slice(0, 1) }}
          </el-avatar></template
        >
        <el-menu>
          <el-menu-item index="2-1" @click="router.push('/user/profile-edit')"
            >编辑用户信息</el-menu-item
          >
          <el-menu-item index="2-2" @click="logout">退出登录</el-menu-item>
        </el-menu>
      </el-sub-menu>
    </div>
  </el-menu>

  <!-- 登录弹窗 -->
  <el-dialog v-model="loginDialogVisible" title="用户登录" width="400px">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      label-width="auto"
      :rules="formRules"
    >
      <el-form-item prop="username" label="用户名">
        <el-input v-model="loginForm.username" />
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input v-model="loginForm.password" type="password" show-password />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="loginDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="loginSubmitForm(loginFormRef)"
        >登录</el-button
      >
    </template>
  </el-dialog>

  <!-- 注册弹窗 -->
  <el-dialog v-model="registerDialogVisible" title="用户注册" width="400px">
    <el-form
      ref="registerFormRef"
      :model="registerForm"
      label-width="auto"
      :rules="formRules"
    >
      <el-form-item prop="username" label="用户名">
        <el-input v-model="registerForm.username" />
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input
          v-model="registerForm.password"
          type="password"
          show-password
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="registerDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="registerSubmitForm(registerFormRef)"
        >注册</el-button
      >
    </template>
  </el-dialog>
  <CartDrawer
    :drawer-visible="cartDrawerVisible"
    @update:drawer-visible="cartDrawerVisible = false"
  />
</template>

<script setup>
import { ref, reactive } from "vue";
import { useUserStore } from "@/store/users";
import { useCartStore } from "@/store/carts";
import { UserFilled } from "@element-plus/icons-vue";
import { storeToRefs } from "pinia";
import { LoginAPI, RegisterAPI } from "@/api/user";
import { showMessage } from "@/utils/message";
import { useRouter } from "vue-router";
import { ShoppingCart } from "@element-plus/icons-vue";
import CartDrawer from "@/components/cart-drawer.vue";
import clearStorage from "@/utils/clear";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const cartStore = useCartStore();
const { cartGoodsNum } = storeToRefs(cartStore);
const cartDrawerVisible = ref(false);
const router = useRouter();
const loginDialogVisible = ref(false);
const registerDialogVisible = ref(false);
const loginFormRef = ref(null);
const loginForm = reactive({ username: "", password: "" });
const registerFormRef = ref(null);
const registerForm = reactive({ username: "", password: "" });
const formRules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 20, message: "用户名长度应为 3-20 个字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 20, message: "密码长度应为 6-20 个字符", trigger: "blur" },
  ],
};

const registerSubmitForm = async (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (!valid) {
      return;
    }
    RegisterAPI(registerForm)
      .then((res) => {
        userStore.setUser(res.data);
        showMessage("注册成功");
        registerDialogVisible.value = false;
      })
      .catch((error) => {
        showMessage(error, "error");
      });
  });
};

const loginSubmitForm = async (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (!valid) {
      return;
    }
    LoginAPI(loginForm)
      .then((res) => {
        if (res.code === 200) {
          userStore.setUser(res.data);
          showMessage("登录成功");
          loginDialogVisible.value = false;
        } else {
          showMessage(res.msg, "error");
        }
      })
      .catch((error) => {
        showMessage(error, "error");
      });
  });
};

const logout = () => {
  clearStorage();
  router.push("/");
  showMessage("退出登录成功");
};
</script>

<style lang="scss" scoped>
:deep(.el-form-item) {
  margin-bottom: 20px;
  margin-top: 20px;
}

:deep(.el-sub-menu .el-icon) {
  font-size: 18px;
  margin-right: -1px;
  text-align: center;
  vertical-align: middle;
  width: var(--el-menu-icon-width);
}

:deep(.el-form-item__content) {
  display: flex;
  justify-content: flex-end;
}

/* 优化按钮间距 */
:deep(.el-button + .el-button) {
  margin-left: 10px;
}
</style>
