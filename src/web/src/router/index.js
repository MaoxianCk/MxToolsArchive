import { createRouter, createWebHistory } from 'vue-router'
import pinia from '@/stores/index.js'
import { useModuleRoutesStore } from '@/stores/moduleRoutes'

import moduleList from '@/moduleList.json'

const createModuleRoutes = _moduleList => {
  const results = []
  const addToRoutes = (module, routes) => {
    const isLeaf = !module.children || module.type == 'module'
    let item = {
      path: module.code,
      name: module.name,
      children: isLeaf ? null : [],
      info: module
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

// 工具模块路由对象
const moduleRoute = {
  path: '/tool',
  children: createModuleRoutes(moduleList)
}

// 创建router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/HomeView.vue')
    },

    moduleRoute,

    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

// router 钩子
router.beforeEach((to) => {
  document.title = to.name ? `${to.name} | MxTools` : 'MxTools'
})

// 设置工具模块路由到store中
const store = useModuleRoutesStore(pinia)
store.setModuleRoutes(moduleRoute)

console.log(router.getRoutes())

export default router
