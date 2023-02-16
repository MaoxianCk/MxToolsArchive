import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useModuleRouteStore = defineStore('ModuleRoute', () => {
  const moduleRoute = ref({})
  const filterPattern = ref('')
  const setModuleRoute = value => {
    moduleRoute.value = value
  }
  const setPattern = pattern => {
    // console.log('setPattern', pattern)
    filterPattern.value = pattern
  }
  const getFiltered = () => {
    return moduleRoute
  }

  return { moduleRoute, filterPattern, setModuleRoute, setPattern, getFiltered }
})
