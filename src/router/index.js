import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/LoginPage.vue')
    },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/main/main',
      children: [
        {
          path: '/main/main',
          component: () => import('@/views/main/MainPage.vue')
        }
      ]
    }
  ]
})

//未登入攔截
router.beforeEach((to, from) => {
  const useStore = useUserStore()
  if (!useStore.token && to.path !== '/login') return '/login'
  else if (useStore.token && to.path === '/login') return from.path
})

export default router
