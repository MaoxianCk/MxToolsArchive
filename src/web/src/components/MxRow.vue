<script setup>
import { computed } from 'vue';
const props = defineProps({
  gap: {
    type: Number,
    default: 10
  },
  align: {
    type: String,
    default: ''
  }
})

const styles = computed(() => ({
  gap: `${props.gap}px`,
  alignItems: props.align
}))
</script>

<template>
  <div class="mx-row" :style="styles">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.mx-row {
  display: flex;
}
</style>