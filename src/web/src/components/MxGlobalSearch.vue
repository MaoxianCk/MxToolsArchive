<script setup>
import {computed, ref, watch} from 'vue'
import {useModuleRouteStore} from '@/stores/moduleRoutes'
import {useRoute, useRouter} from 'vue-router'

const route = useRoute()
const router = useRouter()
console.log(route)

const moduleRouteStore = useModuleRouteStore()
// store 搜route
const pattern = ref('')

watch(pattern, (newPattern) => {
  moduleRouteStore.setPattern(newPattern)
})

const options = computed(() => {
  return moduleRouteStore.getFilteredOptions(pattern.value)
})

const jumpTo = (path) => {
  router.push(path)
}
</script>

<template>
  <!--<n-input-->
  <!--  v-show="route.path === 'index'"-->
  <!--  v-model:value="pattern"-->
  <!--  clearable-->
  <!--  :maxlength="17"-->
  <!--  placeholder="你要找什么?"-->
  <!--  @input="handleInput" />-->

  <n-auto-complete
    v-model:value="pattern"
    :input-props="{
      autocomplete: 'disabled'
    }"
    clearable
    clear-after-select
    :options="route.path === '/index'?[]:options"
    placeholder="你要找什么?"
    @select="jumpTo" />
</template>
