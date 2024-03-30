import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('@/views/login/LoginPage.vue')
    },
    {
      path: '/main',
      component: () => import('@/views/main/MainPage.vue')
    },
    {
      children: [
        {
          path: '/main/publish',
          component: () => import('@/views/publish/PublishPage.vue')
        },
        {
          path: '/main/more',
          component: () => import('@/views/more/MoreProducts.vue')
        },
        {
          path: '/main/account',
          component: () => import('@/views/account/AccountPage.vue')
        },
        {
          path: '/main/collection',
          component: () => import('@/views/collection/CollectionPage.vue')
        },
        {
          path: '/main/hotProducts',
          component: () => import('@/views/hot/HotPage.vue')
        },
        {
          path: '/main/category',
          component: () => import('@/views/category/CategoryPage.vue')
        },
        {
          path: '/main/manage',
          component: () => import('@/views/manage/ManagePage.vue')
        },
        {
          path: '/main/productDetail/:id',
          component: () => import('@/views/product/ProductDetailPage.vue')
        }
      ]
    }
  ]
})

//未登入攔截
router.beforeEach((to, from) => {
  const useStore = useUserStore()
  // if (!useStore.token && to.path !== '/login') return '/login'
  if (useStore.token && to.path === '/login') return from.path
})

export default router
