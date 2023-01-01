import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useModuleRoutesStore = defineStore('ModuleRoutes', () => {
  const moduleRoutes = ref({})
  const setModuleRoutes = value => {
    moduleRoutes.value = value
  }
  const getFiltered = () => {
    return moduleRoutes
  }

  return { moduleRoutes, setModuleRoutes, getFiltered }
})
