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
        <el-upload
          class="avatar-uploader"
          action="http://localhost:3000/user/uploadAvatar"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :on-remove="handleRemove"
        >
          <img class="w-[100px] h-[100px]" v-if="imageUrl" :src="imageUrl" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
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
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
import { UpdateUserAPI } from "@/api/user";
import { ElMessage } from "element-plus";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const editFormRef = ref(null);

const imageUrl = ref(user.value.avatar);

const handleAvatarSuccess = (response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw);
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
    ElMessage.success("修改成功");
    console.log(res.data);
    userStore.setUser(res.data);
  } catch (error) {
    ElMessage.error("修改失败");
  }
};

// 上传头像前检查
const beforeAvatarUpload = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
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
