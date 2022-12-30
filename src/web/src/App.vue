<script setup>
import { RouterView } from 'vue-router'
import MxHeader from '@/components/MxHeader.vue'
</script>

<template>
  <n-layout class="wrapper">
    <n-layout-header>
      <mx-header />
    </n-layout-header>
    <n-layout-content content-style="padding: 24px;">
      <RouterView />
    </n-layout-content>
  </n-layout>
</template>

<style scoped>
.wrapper {
  width: 100%;
}
</style>
