import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore(
  'app',
  () => {
    const isDarkMode = ref(false)
    const setIsDarkMode = (theme) => (isDarkMode.value = theme)
    return {
      isDarkMode,
      setIsDarkMode
    }
  },
  {
    persist: true
  }
)
