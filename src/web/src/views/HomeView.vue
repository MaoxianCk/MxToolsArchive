<script setup>
import { useModuleRoutesStore } from '@/stores/moduleRoutes';
import { ref } from 'vue';

const moduleRoutesStore = useModuleRoutesStore()

const moduleRoutes = moduleRoutesStore.getFiltered()
const moduleBox = ref(null)

const createModuleCard = () => {
  const addToDom = (route, dom) => {
    const isLeaf = !route.children
    let item = null
    if (isLeaf) {

    } else {

    }
    dom.add(item)
    return item
  }
  const travelEach = (moduleList, domRoot) => {
    if (!moduleList) { return }
    moduleList.map(item => {
      let route = addToDom(item, domRoot)
      travelEach(item.children, route.children)
    })
  }
  travelEach(moduleRoutes, moduleBox)
}

</script>

<template>
  homeView

  <div ref="moduleBox" class="module-box">
    <!-- modules   -->

  </div>
</template>

<style scoped>
.module-box {
  width: 100%;
  border: 1px solid var(--main-color);
}
</style>