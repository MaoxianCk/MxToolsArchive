import { createRouter, createWebHistory } from 'vue-router'
import pinia from '@/stores/index.js'
import { useModuleRouteStore } from '@/stores/moduleRoutes'

import moduleList from '@/moduleList.json'



const createModuleRoutes = _moduleList => {
  const results = []
  const s = new Set()
  const files = import.meta.globEager('@/modules/*.vue');
  Object.keys(files).forEach((fileName) => {
    const name = fileName.replace(/\/.*\/|\.vue/g, '');
    s.add(name)
  });
  const addToRoutes = (module, routes) => {
    const isLeaf = !module.children || module.type == 'module'
    let item = {
      path: module.code,
      name: module.name,
      children: isLeaf ? null : [],
      meta: {
        info: module,
        isLeaf: isLeaf
      }
    }
    if (isLeaf) {
      if (s.has(module.code)) {
        item.component = () => import(`@/modules/${module.code}.vue`)
      }
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
      component: () => import('@/views/HomeView/index.vue')
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
const store = useModuleRouteStore(pinia)
store.setModuleRoute(moduleRoute)

console.log(router.getRoutes())

export default router
