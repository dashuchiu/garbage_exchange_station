import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from '@/stores/index'
import 'element-plus/theme-chalk/src/message-box.scss'
import 'element-plus/theme-chalk/src/message.scss'
import '@/assets/style/dark_var.scss'
import i18n from './i18n'
import '@/mock/mockServer'

const app = createApp(App)
app.use(pinia).use(router).use(i18n).mount('#app')
