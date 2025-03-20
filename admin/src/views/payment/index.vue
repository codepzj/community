<template>
  <div>
    <a-table :columns="columns" :data-source="paymentList" bordered>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'resident_id'">
          <span>{{ record.resident_name }}</span>
        </template>
        <template v-else-if="column.dataIndex === 'water_fee'">
          <span>{{ record.water_fee }}</span>
        </template>
        <template v-else-if="column.dataIndex === 'electricity_fee'">
          <span>{{ record.electricity_fee }}</span>
        </template>
        <template v-else-if="column.dataIndex === 'property_fee'">
          <span>{{ record.property_fee }}</span>
        </template>
        <template v-else-if="column.dataIndex === 'total_amount'">
          <span>{{ record.total_amount }}</span>
        </template>
        <template v-else-if="column.dataIndex === 'payment_status'">
          <span>
            <a-tag :color="record.payment_status === 'pending' ? 'red' : 'green'">
              {{ record.payment_status === 'pending' ? '未缴费' : '已缴费' }}
            </a-tag>
          </span>
        </template>
        <template v-else-if="column.dataIndex === 'createdAt'">
          <span>{{ formatTime(record.createdAt) }}</span>
        </template>
        <template v-else-if="column.dataIndex === 'updatedAt'">
          <span>{{ formatTime(record.updatedAt) }}</span>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import { getPaymentList } from "@/api/modules/payments";
import type { paymentVO } from "@/api/interfaces/payments";
import { ref, onMounted } from "vue";
import type { ColumnType } from "ant-design-vue/es/table";
import { formatTime } from "@/utils/time";
import { getResidentById } from "@/api/modules/user";

const paymentList = ref<paymentVOWithName[]>([]);

interface paymentVOWithName extends paymentVO {
  resident_name: string;
}

const columns = ref<ColumnType<paymentVOWithName>[]>([
  {
    title: "居民",
    dataIndex: "resident_id",
  },
  {
    title: "水费",
    dataIndex: "water_fee",
  },
  {
    title: "电费",
    dataIndex: "electricity_fee",
  },
  {
    title: "物业费",
    dataIndex: "property_fee",
  },
  {
    title: "总费用",
    dataIndex: "total_amount",
  },
  {
    title: "缴费状态",
    dataIndex: "payment_status",
  },
  {
    title: "创建时间",
    dataIndex: "createdAt",
  },
  {
    title: "更新时间",
    dataIndex: "updatedAt",
  },
]);

const getResidentNameById = async (id: number) => {
  const res = await getResidentById(id);
  return res.data.username;
};

onMounted(async () => {
  const res = await getPaymentList();
  paymentList.value = res.data.map((item) => ({
    ...item,
    resident_name: "",
  }));
  paymentList.value.forEach(async (item) => {
    const name = await getResidentNameById(item.resident_id);
    item.resident_name = name;
  });
});
</script>
