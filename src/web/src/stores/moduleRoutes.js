import {ref} from 'vue'
import {defineStore} from 'pinia'
import {calIsShow} from '@/modules/utils/moduleRouteUtils';

export const useModuleRouteStore = defineStore('ModuleRoute', () => {
    const moduleRoute = ref({})
    const filterPattern = ref('')
    const setModuleRoute = value => {
        moduleRoute.value = value
    }
    const setPattern = pattern => {
        filterPattern.value = pattern
    }
    const getFilteredOptions = (pattern) => {
        const filtered = moduleRoute.value.children.map(category => ({
            label: category.name,
            type: 'group',
            children: category.children.filter(moduleItem => calIsShow(moduleItem, pattern))
                .map(moduleItem => ({
                    label: moduleItem.name,
                    value: moduleItem.meta.routePath
                }))
        })).filter(category => category.children.length > 0)
        return filtered
    }

    return {moduleRoute, filterPattern, setModuleRoute, setPattern, getFilteredOptions}
})
