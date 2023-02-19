<script setup>
import { useModuleRouteStore } from '@/stores/moduleRoutes';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { calIsShow } from '@/modules/utils/moduleRouteUtils';
import Module from './components/Module.vue'

const moduleRouteStore = useModuleRouteStore()

const moduleRoute = moduleRouteStore.moduleRoute
const { filterPattern } = storeToRefs(moduleRouteStore)

const isShow = computed(() => module => {
  return calIsShow(module, filterPattern.value)
})

</script>

<template>
  <div class="module-box">
    <!-- modules   -->
    <n-card v-for="moduleType of moduleRoute.children" :key="moduleType.meta.routePath" :title="moduleType.name">
      <div class="module-box-type">
        <template v-for="item of moduleType.children" :key="item.path">
          <Module v-show="isShow(item)" :module="item" />
        </template>
      </div>
    </n-card>
  </div>
</template>

<style scoped lang="scss">
.module-box {
  width: 100%;
  display: flex;
  flex-direction: column;

  & > * {
    margin-bottom: 20px;
  }

  .module-box-type {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(347px, 1fr));
    gap: 20px;
  }
}
</style>
