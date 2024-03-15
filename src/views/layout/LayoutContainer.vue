<script setup>
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { UserFilled, Search } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import { ref } from 'vue'
const userStore = useUserStore()
const router = useRouter()

onMounted(() => {
  userStore.getUser()
})

// const logout = () => {
//   userStore.removeToken()
//   userStore.setUser({})
//   router.push('/login')
// }

const publish = () => {
  router.push('/main/publish')
}
const isLoggedOut = ref(true)
if (userStore.token) {
  isLoggedOut.value = false
}
// const onCommand = async (command) => {
//   if (command === 'logout') {
//     await ElMessageBox.confirm('你確認登出嗎？', '稍等一下', {
//       type: 'warning',
//       confirmButtonText: '確認',
//       cancelButtonText: '取消'
//     })
//     userStore.removeToken()
//     userStore.setUser({})
//     isLoggedIn.value = false
//     // router.push(`/login`)
//   } else if (command === 'login') {
//     router.push(`/login`)
//   } else {
//     router.push(`/main/${command}`)
//   }
// }
const onCommand = async (command) => {
  if (command === 'logout') {
    await ElMessageBox.confirm('你確認登出嗎？', '稍等一下', {
      type: 'warning',
      confirmButtonText: '確認',
      cancelButtonText: '取消'
    })
    userStore.removeToken()
    userStore.setUser({})
    isLoggedOut.value = true
  } else {
    router.push(`/main/${command}`)
  }
}
const login = () => {
  router.push(`/login`)
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header class="nav">
        <el-row>
          <el-col :span="22">
            <el-link href="/" :underline="false">
              <el-image
                style="width: 150px; height: 150px"
                src="/src/assets/logo.png"
                fit="contain"
              />
            </el-link>
            <el-link :underline="false">熱門</el-link>
            <el-link :underline="false">分類</el-link>
            <el-input
              style="width: 180px"
              :suffix-icon="Search"
              placeholder="找廢物"
            ></el-input>
          </el-col>
          <el-col class="r-nav" :span="2">
            <el-button
              class="btn-login"
              v-if="isLoggedOut"
              @click="login"
              round
              size="large"
              >登入</el-button
            >
            <el-dropdown v-else @command="onCommand">
              <span class="el-dropdown-link">
                <el-avatar :icon="UserFilled" />
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="account">帳號</el-dropdown-item>
                  <el-dropdown-item command="favorite">收藏</el-dropdown-item>
                  <el-dropdown-item command="logout">登出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <el-button @click="publish" round size="large">丟廢物</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main><router-view></router-view></el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>
<style lang="scss" scoped>
.nav {
  // border: 1px solid black;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 8px 0 rgba(32, 33, 36, 0.28);
  .el-row {
    width: 100%;
    max-width: 1600px;
    .el-link {
      // border: 1px solid rgb(255, 176, 176);
      margin: 0 20px;
      font-size: 20px;
    }
    .el-input {
      margin-left: 30px;
    }
    .r-nav {
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      .btn-login {
        margin-left: 10px;
      }
      .el-dropdown-link {
        cursor: pointer;
        outline-style: none;
        // color: var(--el-color-primary);
        display: flex;
        align-items: center;
        .el-avatar {
          margin: 0 20px;
        }
      }
    }
  }
}
</style>
