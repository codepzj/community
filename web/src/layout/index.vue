<template>
  <div class="common-layout">
    <el-container>
      <el-container>
        <el-header class="header">
          <Header></Header>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Header from "./header.vue";
</script>

<style lang="scss" scoped>
.header {
  background-color: #fff;
  border-bottom: 1px solid #c9c6c6;
}
</style>
