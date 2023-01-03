<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useModuleRouteStore } from '@/stores/moduleRoutes';
import { storeToRefs } from 'pinia';
import { calIsShow } from '@/modules/tools/moduleRouteUtils';

const props = defineProps({
  module: {
    type: Object,
    default() {
      return null
    }
  }
})

const router = useRouter()
const jumpTo = (path) => {
  console.log(path)
  router.push(path)
}

const moduleRouteStore = useModuleRouteStore()
const { filterPattern } = storeToRefs(moduleRouteStore)
const isShow = computed(() => {
  return calIsShow(props.module, filterPattern.value)
  // return props.module.path.indexOf(filterPattern.value) !== -1
})

</script>

<template>
  <!-- <n-thing v-show="isShow" ref="cardRef" class="module-tool-card"> -->
  <n-thing ref="cardRef" class="module-tool-card">
    <template #header>{{ module.name }}</template>
    <!-- <n-ellipsis :style="{ 'max-width': cardContentWidth }" :line-clamp="4"> -->
    <span class="module-tool-card-desc">{{ module.meta.info.description }}</span>
    <!-- <template #tooltip>
        <div :style="{ 'max-width': cardContentWidth }">
          {{ module.meta.info.description }}
        </div>
      </template>
    </n-ellipsis> -->
    <template #header-extra>
      <n-button
        type="primary"
        size="tiny"
        round
        @click="jumpTo(module.meta.routePath)">Go</n-button>
    </template>
  </n-thing>
</template>

<style scoped>
.module-tool-card {
  height: 137px;
  border: 1px solid var(--border-color);
  padding: 10px;
}
.module-tool-card-desc {
  text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    line-clamp: 4;
    -webkit-box-orient: vertical;
}
</style>