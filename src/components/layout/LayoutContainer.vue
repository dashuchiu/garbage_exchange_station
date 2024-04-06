<script setup>
import { useUserStore, useAppStore } from '@/stores'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { UserFilled, Search } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import { ref, inject } from 'vue'
import { setTheme, getTheme } from '@/utils/localStorage'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
console.log(locale)
const userStore = useUserStore()
const { isLightMode, setIsLightMode } = useAppStore()

const router = useRouter()

//搜尋功能
const state = ref('')
const links = ref([])

const loadAll = () => {
  const { products } = inject('collect')
  return products.value || []
}

let timeout
const querySearchAsync = (queryString, cb) => {
  if (!queryString) {
    cb([])
    return
  }

  const results = links.value.filter(createFilter(queryString))
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    if (results.length === 0) {
      cb([{ title: '暫無數據' }])
      console.log(results)
    } else {
      cb(results)
      console.log(results)
    }
  }, 1000 * Math.random())
}

const createFilter = (queryString) => {
  return (restaurant) => {
    return (
      restaurant.title.toLowerCase().indexOf(queryString.trim().toLowerCase()) >
      -1
    )
  }
}

const handleSelect = (item) => {
  console.log(item)
  if (item.id) {
    router.push(`/main/productDetail/${item.id}`)
  }
}
// const user = userInfo
onMounted(() => {
  userStore.getUser()
  links.value = loadAll()
})
//會員資訊>email
const userInfo = ref(userStore.userInfo)

const publish = () => {
  router.push('/main/publish')
}
const isLoggedOut = ref(true)
if (userStore.token) {
  isLoggedOut.value = false
}
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
const category = () => {
  router.push(`/main/category`)
}
const setBodyThemeClass = (theme) => {
  const body = document.body
  body.className = ''
  body.classList.toggle(theme)
}
const toggleTheme = () => {
  setIsLightMode(!isLightMode)
  setTheme(!isLightMode ? 'light' : 'dark') // localStorage => 'dark'
  setBodyThemeClass(getTheme('theme')) // 'dark'
}
// watch()
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header class="nav">
        <el-row>
          <el-col :span="20">
            <el-link @click="router.push(`/main`)" :underline="false">
              <img
                style="width: 120px"
                src="@/assets/garbage_main_logo.png"
                alt=""
              />
            </el-link>
            <el-link @click="category" :underline="false">{{
              t('common.category')
            }}</el-link>
            <el-link @click="toggleTheme" :underline="false">背景切換</el-link>
            <el-autocomplete
              v-model="state"
              :fetch-suggestions="querySearchAsync"
              :placeholder="t('placeholder.search')"
              :clearable="true"
              :suffix-icon="Search"
              value-key="title"
              @select="handleSelect"
            />
          </el-col>
          <el-col class="r-nav" :span="4">
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
                <span class="userInfo">{{ userInfo.email }}</span>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="account">{{
                    t('common.account')
                  }}</el-dropdown-item>
                  <el-dropdown-item command="collection">{{
                    t('common.collect')
                  }}</el-dropdown-item>
                  <el-dropdown-item command="manage">{{
                    t('common.manage')
                  }}</el-dropdown-item>
                  <el-dropdown-item command="logout">{{
                    t('common.logout')
                  }}</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <el-button @click="publish" round size="large">{{
              t('common.publish')
            }}</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <slot name="content"></slot>
      </el-main>
      <el-footer> © 2024 Recycle Studio</el-footer>
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
          margin: 0 5px 0 20px;
        }
      }
    }
  }
}
.el-footer {
  text-align: center;
}
.userInfo {
  min-width: 50px;
}
</style>
