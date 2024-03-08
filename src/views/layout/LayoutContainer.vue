<script setup>
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
const userStore = useUserStore()
const router = useRouter()

onMounted(() => {
  userStore.getUser()
})

const logout = () => {
  userStore.removeToken()
  userStore.setUser({})
  router.push('/login')
}
</script>

<template>
  <div>布局</div>
  <router-view></router-view>
  <div>
    帳戶名稱:<strong>{{ userStore.userInfo.email }}</strong>
  </div>
  <el-button @click="logout" type="primary">登出</el-button>
</template>
<style lang="scss" scoped></style>
