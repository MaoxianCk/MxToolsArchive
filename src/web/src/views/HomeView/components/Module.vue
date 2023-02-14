<script setup>

const props = defineProps({
  module: {
    type: Object,
    default() {
      return null
    }
  }
})

</script>

<template>
  <n-thing ref="cardRef" class="module-tool-card">
    <template #header>{{ module.name }}</template>
    <span class="module-tool-card-desc">{{ module.meta.description }}</span>
    <template #header-extra>
      <router-link :to="module.meta.routePath" class="clear-a-style">
        <n-button
          type="primary"
          size="tiny"
          round>Go</n-button></router-link>
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
