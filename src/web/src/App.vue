<script setup>
import { RouterView } from 'vue-router'
import MxHeader from '@/components/MxHeader.vue'
import { zhCN, dateZhCN  } from 'naive-ui'
</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <n-message-provider>
      <n-layout class="wrapper">
        <n-layout-header>
          <mx-header />
        </n-layout-header>
        <n-layout-content content-style="padding: 20px 10% 0 10%;">
          <RouterView />
        </n-layout-content>
      </n-layout>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped>
.wrapper {
  width: 100%;
}
</style>
