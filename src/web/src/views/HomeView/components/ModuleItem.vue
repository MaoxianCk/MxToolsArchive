<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

defineProps({
  module: {
    type: Object,
    default() {
      return null
    }
  }
})

const vResize = {
  mounted(el, binding) {
    // 这里使用debounce防抖处理，防抖的延时时间可以通过自定义指令的参数传过来，如`v-resize:300`表示300ms延时
    // 也可以将此处延时去掉，放在绑定的函数中自定义
    function debounce(fn, delay = 16) {
      let t = null
      return function () {
        if (t) {
          clearTimeout(t)
        }
        // const context = this
        // const args = arguments
        t = setTimeout(function () {
          // fn.apply(context, args)
          fn && fn({
            clientWidth: el.clientWidth,
            clientHeight: el.clientHeight,
            offsetWidth: el.offsetWidth,
            offsetHeight: el.offsetHeight
          })
        }, delay)
      }
    }
    el._resizer = new window.ResizeObserver(debounce(binding.value, Number(binding.arg) || 16))
    el._resizer.observe(el)
  },
  unmounted(el) {
    el._resizer.disconnect()
  }
}

const cardContentWidth = ref('100px')
const onResize = (e) => {
  cardContentWidth.value = e.offsetWidth - 20 + 'px'
}

// TODO fix path
const router = useRouter()
const jumpTo = (path) => {
  console.log(path)
  router.push(path)
}

</script>

<template>
  <n-thing ref="cardRef" v-resize="onResize" class="module-tool-card">
    <template #header>{{ module.name }}</template>
    <n-ellipsis :style="{ 'max-width': cardContentWidth }" :line-clamp="4">
      {{ module.meta.info.description }}
      <template #tooltip>
        <div :style="{ 'max-width': cardContentWidth }">
          {{ module.meta.info.description }}
        </div>
      </template>
    </n-ellipsis>
    <template #header-extra>
      <n-button
        type="primary"
        size="tiny"
        round
        @click="jumpTo(module.path)">Go</n-button>
    </template>
  </n-thing>
</template>

<style scoped>
.module-tool-card {
  /* height: 140px; */
  border: 1px solid var(--border-color);
  padding: 10px;
}
</style>