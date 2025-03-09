<template>
  <el-card shadow="never">
    <template #header>
      <div class="text-2xl font-bold">编辑用户信息</div>
    </template>
    <el-form
      ref="editFormRef"
      :model="editForm"
      label-width="auto"
      class="w-[600px]"
    >
      <el-form-item label="邮箱">
        <el-input v-model="editForm.email" />
      </el-form-item>
      <el-form-item label="头像">
        <el-tooltip
          class="box-item"
          effect="dark"
          content="点击上传头像覆盖当前头像"
          placement="right"
        >
          <el-upload
            class="avatar-uploader"
            :action="`${baseApi}/user/uploadAvatar`"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :on-remove="handleRemove"
          >
            <img class="w-[100px] h-[100px]" v-if="imageUrl" :src="imageUrl" />
            <el-icon v-else class="avatar-uploader-icon"
              ><i class="el-icon-plus"></i></el-icon
          ></el-upload>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="editForm.phone" />
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="editForm.address" />
      </el-form-item>
    </el-form>
    <div class="flex justify-center">
      <el-button class="w-[200px]" type="primary" @click="confirmEdit"
        >确认修改</el-button
      >
    </div>
  </el-card>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/store/users";
import { storeToRefs } from "pinia";
import { UpdateUserAPI } from "@/api/user";
import { useRouter } from "vue-router";
import { showMessage } from "@/utils/message";

const baseApi = import.meta.env.VITE_API_URL;
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const router = useRouter();
const editFormRef = ref(null);

const imageUrl = ref(user.value.avatar);

const handleAvatarSuccess = (response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw);
  showMessage("上传图片成功");
  editForm.value.avatar = `${baseApi}${response.data.filepath}`;
};

const editForm = ref({
  id: user.value.id,
  email: user.value.email,
  avatar: user.value.avatar,
  phone: user.value.phone,
  address: user.value.address,
});

const confirmEdit = async () => {
  try {
    const res = await UpdateUserAPI(editForm.value);
    showMessage("修改成功");
    userStore.setUser(res.data);
    router.push({ name: "Home" });
  } catch (error) {
    showMessage("修改失败", "error");
  }
};

// 上传头像前检查
const beforeAvatarUpload = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 2) {
    showMessage("图片大小不能超过2MB", "error");
    return false;
  }
  return true;
};

const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
