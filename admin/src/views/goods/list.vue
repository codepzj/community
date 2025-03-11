<template>
  <div class="flex justify-end m-4">
    <a-button type="primary" @click="addGoodsClick">添加商品</a-button>
  </div>
  <div>
    <a-table :columns="columns" :data-source="goodsData" rowKey="id">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'image'">
          <img :src="baseUrl + record.image" alt="商品图片" class="w-16 h-16 object-cover rounded" />
        </template>
        <span v-else-if="column.dataIndex === 'name'">{{ record.name }}</span>
        <span v-else-if="column.dataIndex === 'price'">{{ record.price }}</span>
        <span v-else-if="column.dataIndex === 'description'">{{ record.description }}</span>
        <span v-else-if="column.dataIndex === 'createdAt'">
          {{ dayjs(record.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
        </span>
        <span v-else-if="column.dataIndex === 'updatedAt'">
          {{ dayjs(record.updatedAt).format("YYYY-MM-DD HH:mm:ss") }}
        </span>
        <span v-else-if="column.dataIndex === 'action'">
          <a-button type="link" @click="editGoods(record)">编辑</a-button>
          <a-button type="link" @click="deleteGoodsClick(record.id)" class="text-red-500">删除</a-button>
        </span>
      </template>
    </a-table>
  </div>

  <!-- 添加/编辑商品弹窗 -->
  <a-modal v-model:open="goodsModalOpen" :title="isEditing ? '编辑商品' : '添加商品'" @ok="confirmGoods">
    <a-form :model="goodsForm" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
      <a-form-item label="商品名称">
        <a-input v-model:value="goodsForm.name" />
      </a-form-item>
      <a-form-item label="价格">
        <a-input v-model:value="goodsForm.price" type="number" />
      </a-form-item>
      <a-form-item label="描述">
        <a-input v-model:value="goodsForm.description" />
      </a-form-item>
      <a-form-item label="图片">
        <a-upload v-model:file-list="fileList" :action="uploadUrl" :show-upload-list="false" @change="handleUploadChange">
          <a-button type="primary">上传图片</a-button>
        </a-upload>
        <div v-if="goodsForm.image" class="mt-2">
          <img :src="baseUrl + goodsForm.image" alt="上传图片" class="w-20 h-20 object-cover rounded" />
        </div>
      </a-form-item>
      <a-form-item label="维修类型">
        <a-select v-model:value="goodsForm.type_id" :options="repairTypeList" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { message, type UploadFile } from "ant-design-vue";
import dayjs from "dayjs";
import { getGoodsList, addGoods, updateGoods, deleteGoods } from "@/api/modules/goods";
import { getRepairTypeList } from "@/api/modules/repair_type";
import type { GoodsVO, AddGoodsReq, UpdateGoodsReq } from "@/api/interfaces/goods";
import type { ColumnProps } from "ant-design-vue/es/table/Column";

const uploadUrl = import.meta.env.VITE_API_URL + "/user/uploadAvatar";
const fileList = ref<UploadFile[]>([]);
const baseUrl = import.meta.env.VITE_API_URL;

const columns = ref<ColumnProps[]>([
  { title: "图片", dataIndex: "image" },
  { title: "商品名称", dataIndex: "name" },
  { title: "价格", dataIndex: "price" },
  { title: "描述", dataIndex: "description" },
  { title: "创建时间", dataIndex: "createdAt" },
  { title: "更新时间", dataIndex: "updatedAt" },
  { title: "操作", dataIndex: "action" },
]);

const repairTypeList = ref<{ value: number; label: string }[]>([]);
const goodsModalOpen = ref(false);
const isEditing = ref(false);
const goodsForm = ref<AddGoodsReq | UpdateGoodsReq>({
  id: 0,
  name: "",
  price: 0,
  description: "",
  image: "",
  type_id: 1
});

const goodsData = ref<GoodsVO[]>([]);

const addGoodsClick = () => {
  isEditing.value = false;
  goodsForm.value = { name: "", price: 0, description: "", image: "", type_id: 1 };
  goodsModalOpen.value = true;
};

const editGoods = (record: GoodsVO) => {
  isEditing.value = true;
  goodsForm.value = { ...record, image: record.image || "", type_id: record.type_id || 1 };
  goodsModalOpen.value = true;
};

const handleUploadChange = (info: any) => {
  if (info.file.status === "done") {
    const response = info.file.response;
    if (response.code === 200) {
      goodsForm.value.image = response.data.filepath;
      message.success("图片上传成功");
    } else {
      message.error(response.msg || "图片上传失败");
    }
  } else if (info.file.status === "error") {
    message.error("图片上传失败");
  }
};

const confirmGoods = async () => {
  try {
    const res = isEditing.value ? await updateGoods(goodsForm.value) : await addGoods(goodsForm.value);
    if (res.code === 200) {
      goodsModalOpen.value = false;
      await getGoodsListData();
      message.success(`${isEditing.value ? '编辑' : '添加'}商品成功`);
    } else {
      message.error(res.msg);
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteGoodsClick = async (id: number) => {
  try {
    await deleteGoods(id);
    await getGoodsListData();
    message.success("删除商品成功");
  } catch (error) {
    console.error(error);
  }
};

const getGoodsListData = async () => {
  const res = await getGoodsList();
  goodsData.value = res.data;
};

const getRepairTypeListData = async () => {
  const res = await getRepairTypeList();
  if (res.code === 200) {
    repairTypeList.value = res.data.map((item) => ({ value: item.id, label: item.name }));
  } else {
    message.error(res.msg);
  }
};

onMounted(async () => {
  await getGoodsListData();
  await getRepairTypeListData();
});
</script>