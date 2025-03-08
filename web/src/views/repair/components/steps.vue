<template>
  <el-steps
    :space="200"
    :active="active"
    finish-status="success"
    class="w-full flex justify-center"
    align-center
  >
    <el-step title="提交申请" />
    <el-step title="已受理" />
    <el-step title="维修中" />
    <el-step title="已完成" />
  </el-steps>
</template>
<script setup>
import { ref } from "vue";

const active = ref(0);
</script>
