import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/stores'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
          path: '/main/publish/:id',
          component: () => import('@/views/publish/PublishPage.vue')
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

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (userStore.token && to.path === '/login') {
    next(from.path)
  } else if (!userStore.token && to.path === '/main/publish') {
    ElMessage('請先登入')
    next(from.path)
  } else if (to.path === '/login') {
    next()
    ElMessage('請註冊或以[8@demo.com][888888]登入')
  } else {
    next()
  }
})

export default router
