<script setup>
import Module from './components/Module.vue'
import { useModuleRouteStore } from '@/stores/moduleRoutes';

const moduleRouteStore = useModuleRouteStore()

const moduleRoute = moduleRouteStore.getFiltered()
console.log(moduleRoute)
</script>

<template>
  <div class="module-box">
    <!-- modules   -->
    <n-grid :cols="1" y-gap="40">
      <n-gi v-for="item of moduleRoute.children" :key="item.path">
        <Module :module="item" />
      </n-gi>
    </n-grid>
  </div>
</template>

<style scoped>
.module-box {
  width: 100%;
  /* border: 1px solid var(--main-color); */
}
</style>