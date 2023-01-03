<script setup>
import Module from './components/Module.vue'
import { useModuleRouteStore } from '@/stores/moduleRoutes';
import { storeToRefs } from 'pinia';

const moduleRouteStore = useModuleRouteStore()

const moduleRoute = moduleRouteStore.getFiltered()
console.log(moduleRoute)
const { filterPattern } = storeToRefs(moduleRouteStore)
</script>

<template>
  <div class="module-box">
    {{ filterPattern }}
    <!-- modules   -->
    <n-grid :cols="1" y-gap="40">
      <n-gi v-for="item of moduleRoute.children" :key="item.meta.routePath">
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