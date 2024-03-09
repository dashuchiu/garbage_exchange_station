<script setup>
// import { userRegisterService, userLoginService } from '@/api/user.js'
import { setLang } from '@/utils/localStorage'
import { Message, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ref, watch } from 'vue'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
import { auth } from '@/api/firebase.js'
import { useI18n } from 'vue-i18n'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { useRoute } from 'vue-router'
import { dataApi } from '@/api/mock/module/data'


const { t, locale } = useI18n()
const route = useRoute()
console.log(route);
const langs = ref(['zh-TW', 'en-US'])
const isRegister = ref(false)
const form = ref()
//form對象
const formModel = ref({
  email: '',
  password: '',
  repassword: ''
})
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
    ElMessage.success(t('messages.login_success'))
    console.log(res)
    router.push('/')
  } catch (error) {
    console.log(error.code)
    ElMessage.error('無效的用戶名稱')
  }
}

// mockApi
const getData = async () => {
  const data = await dataApi.getData()
  console.log(data);
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
watch(locale, (newlocale) => {
  setLang(newlocale)
})
</script>

<template>
  <el-container>
    <el-header class="nav">
      <a href="/"><img class="logo" src="@/assets/logo.svg" alt="" /></a>
      <el-select v-model="locale" placeholder="请选择">
        <el-option
          v-for="item in langs"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
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
                placeholder="請輸入密碼"
              ></el-input>
            </el-form-item>
            <el-form-item prop="repassword">
              <el-input
                v-model="formModel.repassword"
                :prefix-icon="Lock"
                type="password"
                placeholder="請再次輸入密碼"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                @click="register"
                class="button"
                type="primary"
                auto-insert-space
              >
                註冊
              </el-button>
            </el-form-item>
            <el-form-item class="flex">
              <el-link
                type="info"
                :underline="false"
                @click="isRegister = false"
              >
                ← 返回
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
              <h1>登入</h1>
            </el-form-item>
            <el-form-item prop="email">
              <el-input
                v-model="formModel.email"
                :prefix-icon="Message"
                placeholder="請輸入email"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="formModel.password"
                name="password"
                :prefix-icon="Lock"
                type="password"
                placeholder="請輸入密碼"
              ></el-input>
            </el-form-item>
            <el-form-item class="flex">
              <div class="flex">
                <el-checkbox>記住我</el-checkbox>
                <el-link type="primary" :underline="false">忘記密碼？</el-link>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button
                @click="login"
                class="button"
                type="primary"
                auto-insert-space
                >登入</el-button
              >
            </el-form-item>
            <el-form-item class="flex">
              <el-link
                type="info"
                :underline="false"
                @click="isRegister = true"
              >
                註冊 →
              </el-link>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>
<style lang="scss" scoped>
.nav {
  // border: 1px solid black;
  height: 100px;
  .logo {
    width: 10%;
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
