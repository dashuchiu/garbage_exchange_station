import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore(
  'app',
  () => {
    const isLightMode = ref(true)
    const setIsLightMode = (theme) => (isLightMode.value = theme)
    return {
      isLightMode,
      setIsLightMode
    }
  },
  {
    persist: true
  }
)
