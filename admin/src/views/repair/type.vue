<template>
  <div class="flex justify-start my-4">
    <a-button type="primary" @click="addRepair">添加维修类型</a-button>
  </div>
  <div>
    <a-table :columns="columns" :data-source="repairTypeData">
      <template #bodyCell="{ column, record }">
        <span v-if="column.dataIndex === 'name'">
          {{ record.name }}
        </span>
        <span v-if="column.dataIndex === 'price'">
          {{ record.price }}
        </span>
        <span v-if="column.dataIndex === 'createdAt'">
          {{ dayjs(record.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
        </span>
        <span v-if="column.dataIndex === 'updatedAt'">
          {{ dayjs(record.updatedAt).format("YYYY-MM-DD HH:mm:ss") }}
        </span>
        <span v-if="column.dataIndex === 'action'">
          <a-button type="link" @click="editRepair(record.id)">编辑</a-button>
          <a-button
            type="link"
            @click="deleteRepair(record.id)"
            class="text-red-500"
            >删除</a-button
          >
        </span>
      </template>
    </a-table>
  </div>
  <a-modal
    v-model:open="addRepairTypeOpen"
    title="添加维修类型"
    @ok="confirmAddRepairType"
  >
    <a-form
      :model="editRepairTypeForm"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-form-item label="维修类型">
        <a-input v-model:value="addRepairTypeForm.name" />
      </a-form-item>
      <a-form-item label="价格">
        <a-input v-model:value="addRepairTypeForm.price" />
      </a-form-item>
    </a-form>
  </a-modal>
  <a-modal
    v-model:open="editRepairTypeOpen"
    title="编辑维修类型"
    @ok="confirmEditRepairType"
  >
    <a-form
      :model="editRepairTypeForm"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-form-item label="维修类型">
        <a-input v-model:value="editRepairTypeForm.name" />
      </a-form-item>
      <a-form-item label="价格">
        <a-input v-model:value="editRepairTypeForm.price" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  getRepairTypeList,
  addRepairType,
  updateRepairType,
  deleteRepairType,
} from "@/api/modules/repair_type";
import type {
  RepairTypeVO,
  AddRepairTypeReq,
  UpdateRepairTypeReq,
} from "@/api/interfaces/repair_type";
import type { ColumnProps } from "ant-design-vue/es/table/Column";
import dayjs from "dayjs";
import { message } from "ant-design-vue";
const columns = ref<ColumnProps[]>([
  {
    title: "维修类型",
    dataIndex: "name",
  },
  {
    title: "价格",
    dataIndex: "price",
  },
  {
    title: "创建时间",
    dataIndex: "createdAt",
  },
  {
    title: "更新时间",
    dataIndex: "updatedAt",
  },
  {
    title: "操作",
    dataIndex: "action",
  },
]);

const addRepairTypeOpen = ref(false);
const addRepairTypeForm = ref<AddRepairTypeReq>({
  name: "",
  price: 0,
});

const editRepairTypeOpen = ref(false);
const editRepairTypeForm = ref<UpdateRepairTypeReq>({
  id: undefined,
  name: "",
  price: 0,
});

const addRepair = () => {
  addRepairTypeOpen.value = true;
};

const confirmAddRepairType = async () => {
  try {
    const res = await addRepairType(addRepairTypeForm.value);
    if (res.code === 200) {
      addRepairTypeOpen.value = false;
      await getRepairTypeListData();
      // 清空表单
      addRepairTypeForm.value = {
        name: "",
        price: 0,
      };
      message.success("添加维修类型成功");
    } else {
      message.error(res.msg);
    }
  } catch (error) {
    console.error(error);
  }
};

const editRepair = (id: number) => {
  editRepairTypeOpen.value = true;
  editRepairTypeForm.value = {
    id: id,
    name: "",
    price: 0,
  };
};

const confirmEditRepairType = async () => {
  try {
    const res = await updateRepairType(
      editRepairTypeForm.value.id as number,
      editRepairTypeForm.value
    );
    if (res.code === 200) {
      editRepairTypeOpen.value = false;
      await getRepairTypeListData();
      message.success("编辑维修类型成功");
      // 清空表单
      editRepairTypeForm.value = {
        id: undefined,
        name: "",
        price: 0,
      };
    } else {
      message.error(res.msg);
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteRepair = async (id: number) => {
  try {
    const res = await deleteRepairType(id);
    if (res.code === 200) {
      await getRepairTypeListData();
      message.success("删除维修类型成功");
    } else {
      message.error(res.msg);
    }
  } catch (error) {
    console.error(error);
  }
};
const repairTypeData = ref<RepairTypeVO[]>([]);

const getRepairTypeListData = async () => {
  const res = await getRepairTypeList();
  repairTypeData.value = res.data;
};

onMounted(async () => {
  await getRepairTypeListData();
});
</script>
