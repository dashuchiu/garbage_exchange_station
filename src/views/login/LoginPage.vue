<script setup>
import { ref, watch, onMounted } from 'vue'
import {
  setLang,
  setRememberMe,
  removeRememberMe,
  getRememberMe
} from '@/utils/localStorage'
import { Message, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores'
import { useRouter, useRoute } from 'vue-router'
import { auth } from '@/api/firebase.js'
import { useI18n } from 'vue-i18n'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { dataApi } from '@/api/mock/module/data'

const { t, locale } = useI18n()
console.log(locale)
const route = useRoute()
console.log(route)
// const langs = ref(['zh-TW', 'en-US'])
const langs = ref([
  { name: '中文', lang: 'zh-TW' },
  { name: 'ENG', lang: 'en-US' }
])
const isRegister = ref(false)
const form = ref()
//form對象
const formModel = ref({
  email: '',
  password: '',
  repassword: ''
})
//記住我
const rememberMe = ref(false)
//校驗規則
const rules = {
  email: [
    { required: true, message: '請輸入email', trigger: 'change' },
    {
      pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      message: '請輸入有效的email',
      trigger: 'change'
    }
  ],
  password: [
    { required: true, message: '請輸入密碼', trigger: 'change' },
    {
      pattern: /^\S{6,15}$/,
      message: '密碼必須包含6-15位字元',
      trigger: 'change'
    }
  ],
  repassword: [
    { required: true, message: '請再次輸入密碼', trigger: 'change' },
    {
      validator: (rule, value, callback) => {
        if (value !== formModel.value.password) {
          callback(new Error('兩次密碼輸入不一致'))
        } else {
          callback()
        }
      },
      trigger: 'change'
    }
  ]
}
//註冊前預校驗
const register = async () => {
  try {
    await form.value.validate()
    await createUserWithEmailAndPassword(
      auth,
      formModel.value.email,
      formModel.value.password
    )
    ElMessage.success('註冊成功')
    isRegister.value = false
  } catch (error) {
    console.log(error.code)
    switch (error.code) {
      case 'auth/invalid-email':
        ElMessage.error('無效的email')
        break
      case 'auth/email-already-in-use':
        ElMessage.error('該email已被使用')
        break
      case 'auth/invalid-continue-uri':
        ElMessage.error('必須是有效的email地址')
        break
      default:
        ElMessage.error('email或密碼不正確')
        break
    }
  }
}
//登入前預校驗
const userStore = useUserStore()
const router = useRouter()
const login = async () => {
  try {
    await form.value.validate()
    const res = await signInWithEmailAndPassword(
      auth,
      formModel.value.email,
      formModel.value.password
    )
    userStore.setToken(res.user.accessToken)
    removeRememberMe('email')
    removeRememberMe('password')
    if (rememberMe.value) {
      setRememberMe('email', formModel.value.email)
      setRememberMe('password', formModel.value.password)
    }
    ElMessage.success(t('messages.login_success'))
    console.log(res)
    router.push('/')
  } catch (error) {
    console.log(error.code)
    ElMessage.error('無效的用戶名稱')
  }
}
//記住我
onMounted(() => {
  const savedUsername = getRememberMe('email')
  const savedPassword = getRememberMe('password')
  if (savedUsername && savedPassword) {
    formModel.value.email = savedUsername
    formModel.value.password = savedPassword
    rememberMe.value = true
  }
})

// mockApi
const getData = async () => {
  const data = await dataApi.getData()
  console.log(data)
}
getData()

//切換註冊/登入重置
watch(isRegister, () => {
  formModel.value = {
    email: '',
    password: '',
    repassword: ''
  }
})
//切換語系
watch(locale, (newlocale) => {
  setLang(newlocale)
})
</script>

<template>
  <el-container>
    <el-header class="nav">
      <a href="/"><img class="logo" src="@/assets/logo.svg" alt="" /></a>

      <el-dropdown>
        <span class="el-dropdown-link">
          <span class="material-symbols-outlined"> language </span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="item in langs"
              :key="item"
              @click="locale = item.lang"
              >{{ item.name }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-header>
    <el-main>
      <el-row class="login-page" justify="center">
        <div class="bg"></div>
        <el-col :xs="8" :sm="6" :md="4" class="form">
          <!-- 註冊表單 -->
          <el-form
            :model="formModel"
            :rules="rules"
            ref="form"
            size="large"
            autocomplete="off"
            v-if="isRegister"
          >
            <el-form-item>
              <h1>{{ t('common.signup') }}</h1>
            </el-form-item>
            <el-form-item prop="email">
              <el-input
                v-model="formModel.email"
                :prefix-icon="Message"
                :placeholder="t('placeholder.email')"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="formModel.password"
                :prefix-icon="Lock"
                type="password"
                :placeholder="t('placeholder.password')"
              ></el-input>
            </el-form-item>
            <el-form-item prop="repassword">
              <el-input
                v-model="formModel.repassword"
                :prefix-icon="Lock"
                type="password"
                :placeholder="t('placeholder.repassword')"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                @click="register"
                class="button"
                type="primary"
                auto-insert-space
              >
                {{ t('common.signup') }}
              </el-button>
            </el-form-item>
            <el-form-item class="flex">
              <el-link
                type="info"
                :underline="false"
                @click="isRegister = false"
              >
                ← {{ t('common.return') }}
              </el-link>
            </el-form-item>
          </el-form>
          <!-- 登入表單 -->
          <el-form
            :model="formModel"
            :rules="rules"
            ref="form"
            size="large"
            autocomplete="off"
            v-else
          >
            <el-form-item>
              <h1>{{ t('common.login') }}</h1>
            </el-form-item>
            <el-form-item prop="email">
              <el-input
                v-model="formModel.email"
                :prefix-icon="Message"
                :placeholder="t('placeholder.email')"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="formModel.password"
                name="password"
                :prefix-icon="Lock"
                type="password"
                :placeholder="t('placeholder.password')"
              ></el-input>
            </el-form-item>
            <el-form-item class="flex">
              <div class="flex">
                <el-checkbox v-model="rememberMe">{{
                  t('common.remember')
                }}</el-checkbox>
                <el-link type="primary" :underline="false">{{
                  t('common.forget')
                }}</el-link>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button
                @click="login"
                class="button"
                type="primary"
                auto-insert-space
                >{{ t('common.login') }}</el-button
              >
            </el-form-item>
            <el-form-item class="flex">
              <el-link
                type="info"
                :underline="false"
                @click="isRegister = true"
              >
                {{ t('common.signup') }} →
              </el-link>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>Footer </el-footer>
  </el-container>
</template>
<style lang="scss" scoped>
.nav {
  // border: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  .logo {
    width: 50%;
  }
  .el-dropdown-link {
    cursor: pointer;
    outline-style: none;
    // color: var(--el-color-primary);
    display: flex;
    align-items: center;
    .material-symbols-outlined {
      font-size: 36px;
    }
  }
}

.login-page {
  .bg {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -999;
    background-image: url('@/assets/login_bg.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .form {
    margin: 40px;
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    &::before {
      position: absolute;
      content: '';
      width: 400px;
      height: 100%;
      border-radius: 4px;
      background-color: rgba(0, 0, 0, 0.3);
      box-shadow: 0 8px 10px 0 rgba(0, 0, 0, 0.2);
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      z-index: -10;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
