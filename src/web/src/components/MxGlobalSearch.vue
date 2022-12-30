<script setup>
import { ref } from 'vue'
// store 搜route
const searchPattern = ref('')
const searchOptions = [
  {
    label: '测试测试',
    value: '测试测试关键字'
  }, {
    label: 'chengwpwpwpwp',
    value: 'chengwpwpwpwp'
  }
]
function handleSearch(path) {
  console.log('jump to ' + path)
}
</script>

<template>
  <n-auto-complete
    v-model:value="searchPattern"
    :options="searchOptions"
    clear-after-select
    blur-after-select
    @select="handleSearch" />
</template>
