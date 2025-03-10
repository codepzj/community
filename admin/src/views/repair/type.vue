<template>
    <div>
        <a-table :columns="columns" :data-source="data">
            <template #bodyCell="{ column, record }">
                <span v-if="column.dataIndex === 'name'">
                    {{ record.name }}
                </span>
                <span v-if="column.dataIndex === 'price'">
                    {{ record.price }}
                </span>
                <span v-if="column.dataIndex === 'createdAt'">
                    {{ dayjs(record.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
                </span>
                <span v-if="column.dataIndex === 'updatedAt'">
                    {{ dayjs(record.updatedAt).format('YYYY-MM-DD HH:mm:ss') }}
                </span>
                <span v-if="column.dataIndex === 'action'">
                </span>
            </template>
        </a-table>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getRepairTypeList } from '@/api/modules/repair_type';
import type { RepairTypeVO } from '@/api/interfaces/repair_type';
import type { ColumnProps } from 'ant-design-vue/es/table/Column';
import dayjs from 'dayjs';
const columns = ref<ColumnProps[]>([
    {
        title: '维修类型',
        dataIndex: 'name',
    },
    {
        title: '价格',
        dataIndex: 'price',
    },
    {
        title: '创建时间',
        dataIndex: 'createdAt',
    },
    {
        title: '更新时间',
        dataIndex: 'updatedAt',
    },
    {
        title: '操作',
        dataIndex: 'action',
    },
]);

const data = ref<RepairTypeVO[]>([]);

onMounted(async () => {
    const res = await getRepairTypeList();
    data.value = res.data;
});
</script>
