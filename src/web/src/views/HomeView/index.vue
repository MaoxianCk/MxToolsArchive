<script setup>
import { useModuleRouteStore } from '@/stores/moduleRoutes';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import Module from './components/Module.vue'

const moduleRouteStore = useModuleRouteStore()

const moduleRoute = moduleRouteStore.getFiltered()
console.log(moduleRoute)
const { filterPattern } = storeToRefs(moduleRouteStore)

const isShow = computed(() => module => {
  return (module.path.indexOf(filterPattern.value) !== -1) ? 1 : 0
})

const respondCols = () => {
  let str = '2'
  const span = 275
  for (let i = 2; i <= 6; i++) {
    str += ` ${span * i}:${i}`
  }
  return str
}

</script>

<template>
  <div class="module-box">
    <!-- modules   -->
    <n-grid :cols="1" y-gap="40">
      <n-gi v-for="moduleType of moduleRoute.children" :key="moduleType.meta.routePath">
        <n-card :title="moduleType.name">
          <n-grid
            :cols="respondCols()"
            x-gap="24"
            y-gap="24"
            responsive="self">
            <n-grid-item v-for="item of moduleType.children" :key="item.path" :span="isShow(item)">
              <Module :module="item" />
            </n-grid-item>
          </n-grid>
        </n-card>
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