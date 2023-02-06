import { createRouter, createWebHistory } from 'vue-router'
import pinia from '@/stores/index.js'
import { useModuleRouteStore } from '@/stores/moduleRoutes'
import { createModuleRoutes } from '@/modules/utils/moduleRouteUtils'
import moduleList from '@/moduleList.json'


// 工具模块路由对象
const moduleRoute = {
  path: '/tool',
  component: () => import('@/modules/index.vue'),
  children: createModuleRoutes(moduleList, '/tool')
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
store.setModuleRoute(moduleRoute, router)

export default router
