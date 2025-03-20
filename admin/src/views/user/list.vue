<template>
  <div class="user-list-container">
    <div class="flex justify-start my-4">
      <a-button type="primary" @click="handleAddUser" class="add-user-btn">
        新增用户
      </a-button>
    </div>
    <a-table
      :columns="columns"
      :data-source="userList"
      :pagination="pagination"
      row-key="id"
      bordered
      class="user-table"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'username'">
          <a>{{ record.username }}</a>
        </template>
        <template v-else-if="column.key === 'role_id'">
          <a-tag :color="record.role_id === 1 ? 'blue' : 'green'">
            {{ record.role_id === 1 ? "管理员" : "社区工作者" }}
          </a-tag>
        </template>
        <template v-else-if="column.key === 'createdAt'">
          <span>{{ formatTime(record.createdAt) }}</span>
        </template>
        <template v-else-if="column.key === 'updatedAt'">
          <span>{{ formatTime(record.updatedAt) }}</span>
        </template>
        <template v-else-if="column.key === 'action'">
          <a-button size="small" @click="handleEdit(record)" class="edit-btn">
            编辑
          </a-button>
          <a-divider type="vertical" />
          <a-button danger size="small" @click="handleDelete(record.id)" class="delete-btn">
            删除
          </a-button>
        </template>
      </template>
    </a-table>

    <!-- 编辑用户弹窗 -->
    <a-modal v-model:open="openEdit" title="编辑用户" @ok="handleOk" class="edit-modal">
      <a-form :model="editUserData" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
        <a-form-item label="用户名">
          <a-input v-model:value="editUserData.username" disabled />
        </a-form-item>
        <a-form-item label="角色">
          <a-select v-model:value="editUserData.role_id">
            <a-select-option :value="1">管理员</a-select-option>
            <a-select-option :value="2">社区工作者</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- 新增用户弹窗 -->
    <a-modal v-model:open="openCreate" title="新增用户" @ok="handleCreateOk" class="create-modal">
      <a-form :model="newUserData" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
        <a-form-item label="用户名">
          <a-input v-model:value="newUserData.username" />
        </a-form-item>
        <a-form-item label="密码">
          <a-input-password v-model:value="newUserData.password" />
        </a-form-item>
        <a-form-item label="角色">
          <a-select v-model:value="newUserData.role_id">
            <a-select-option :value="1">管理员</a-select-option>
            <a-select-option :value="2">社区工作者</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getAllAdmin, addAdmin, updateAdmin, deleteAdmin } from "@/api/modules/user";
import type { User } from "@/api/interfaces/user";
import { message } from "ant-design-vue";
import { formatTime } from "@/utils/time";

const userList = ref<User[]>([]);
const openEdit = ref(false);
const openCreate = ref(false);
const editUserData = ref<User>({ id: 0, username: "", password: "", role_id: 2 });
const newUserData = ref<User>({ id: 0, username: "", password: "", role_id: 2 });

const getAllAdminUser = async () => {
  const res = await getAllAdmin();
  userList.value = res.data;
};

onMounted(getAllAdminUser);

const columns = ref([
  { title: "ID", dataIndex: "id", key: "id" },
  { title: "用户名", dataIndex: "username", key: "username" },
  { title: "角色", dataIndex: "role_id", key: "role_id" },
  { title: "创建时间", dataIndex: "createdAt", key: "createdAt" },
  { title: "更新时间", dataIndex: "updatedAt", key: "updatedAt" },
  { title: "操作", key: "action", dataIndex: "action" },
]);

const pagination = ref({
  pageSize: 5,
  showSizeChanger: true,
  showTotal: (total: number) => `共 ${total} 条`,
});

// 编辑用户
const handleEdit = (record: User) => {
  editUserData.value = { ...record };
  openEdit.value = true;
};

const handleOk = async () => {
  try {
    await updateAdmin(editUserData.value);
    message.success("更新成功");
    await getAllAdminUser();
    openEdit.value = false;
  } catch (err: any) {
    message.error(err.message);
  }
};

// 删除用户
const handleDelete = async (id: number) => {
  try {
    await deleteAdmin(id);
    message.success("删除成功");
    userList.value = userList.value.filter((item) => item.id !== id);
  } catch (err: any) {
    message.error(err.message);
  }
};

// 打开新增用户弹窗
const handleAddUser = () => {
  newUserData.value = { id: 0, username: "", password: "", role_id: 2 };
  openCreate.value = true;
};

// 提交新增用户
const handleCreateOk = async () => {
  try {
    if (!newUserData.value.username || !newUserData.value.password) {
      message.warning("请填写完整信息");
      return;
    }
    await addAdmin(newUserData.value);
    message.success("新增用户成功");
    await getAllAdminUser();
    openCreate.value = false;
  } catch (err: any) {
    message.error(err.message);
  }
};
</script>
