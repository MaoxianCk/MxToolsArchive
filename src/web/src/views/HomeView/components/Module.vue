<script setup>
import { ref } from 'vue';
import Module from './Module.vue'
import ModuleItem from './ModuleItem.vue'

defineProps({
  module: {
    type: Object,
    default() {
      return null
    }
  }
})

const respondCols = () => {
  let str = '1'
  const span = 270
  for (let i = 2; i <= 6; i++) {
    str += ` ${span * i}:${i}`
  }
  return str
}

</script>
<template>
  <ModuleItem v-if="module.meta.isLeaf === true" />
  <template v-else>
    <n-card :title="module.name">
      <n-grid
        :cols="respondCols()"
        x-gap="24"
        y-gap="17"
        responsive="self">
        <n-grid-item v-for="item of module.children" :key="item.path">
          <component :is="item.meta.isLeaf ? ModuleItem : Module" :module="item" />
        </n-grid-item>
      </n-grid>
    </n-card>
  </template>
</template>