import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useModuleRouteStore = defineStore('ModuleRoute', () => {
  const moduleRoute = ref({})
  const setModuleRoute = value => {
    moduleRoute.value = value
  }
  const getFiltered = () => {
    return moduleRoute
  }

  return { moduleRoute, setModuleRoute, getFiltered }
})
