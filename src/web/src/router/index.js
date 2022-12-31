import { createRouter, createWebHistory } from 'vue-router'
import moduleList from '@/moduleList.json'

const createModuleRoutes = _moduleList => {
  const results = []
  const addToRoutes = (module, routes) => {
    const isLeaf = !module.children || module.type == 'module'
    let item = {
      path: module.code,
      name: module.name,
      children: isLeaf ? null : []
    }
    if (isLeaf) {
      item.component = () => import(`@/modules/${module.code}.vue`)
    }
    routes.push(item)
    return item
  }
  const travelEach = (list, resList) => {
    if (!list) { return }
    list.map(item => {
      let route = addToRoutes(item, resList)
      travelEach(item.children, route.children)
    })
  }
  travelEach(_moduleList, results)

  return results
}

const moduleRoutes = createModuleRoutes(moduleList)
console.log(moduleRoutes)


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/tool',
      children: moduleRoutes
    }
  ]
})

router.beforeEach((to, from) => {
  console.log(to, from)
  document.title = to.name ? `${to.name} | MxTools` : 'MxTools'
  return true;
})

export default router
