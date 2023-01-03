<script setup>
import { computed } from 'vue';
import Module from './Module.vue'
import ModuleItem from './ModuleItem.vue'
import { useModuleRouteStore } from '@/stores/moduleRoutes';
import { storeToRefs } from 'pinia';

const props = defineProps({
  module: {
    type: Object,
    default() {
      return null
    }
  }
})

const moduleRouteStore = useModuleRouteStore()
const { filterPattern } = storeToRefs(moduleRouteStore)
const isShow = computed(() => module => {
  console.log(module)
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
  <template v-if="module.meta.isLeaf !== true">
    <n-card :title="module.name">
      <n-grid
        :cols="respondCols()"
        x-gap="24"
        y-gap="24"
        responsive="self">
        <n-grid-item v-for="item of module.children" :key="item.path" :span="isShow(item)">
          <ModuleItem :module="item" />
        </n-grid-item>
      </n-grid>
    </n-card>
  </template>
</template>