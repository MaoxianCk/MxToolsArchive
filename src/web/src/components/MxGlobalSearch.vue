<script setup>
import { ref } from 'vue'
import { useModuleRouteStore } from '@/stores/moduleRoutes'

const moduleRouteStore = useModuleRouteStore()
// store 搜route
const pattern = ref('')
function handleInput() {
  moduleRouteStore.setPattern(pattern.value)
}
</script>

<template>
  <n-input
    v-model:value="pattern"
    clearable
    :maxlength="17"
    placeholder="你要找什么?"
    @input="handleInput" />
</template>
