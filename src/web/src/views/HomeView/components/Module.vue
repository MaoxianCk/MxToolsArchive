<script setup>
import { useRouter } from 'vue-router';

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

</script>

<template>
  <n-thing ref="cardRef" class="module-tool-card">
    <template #header>{{ module.name }}</template>
    <span class="module-tool-card-desc">{{ module.meta.info.description }}</span>
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