import { defineStore } from 'pinia'
import { ref } from 'vue'
import { productApi } from '@/api/mock/module/data'

export const useProductsStore = defineStore(
  'products',
  () => {
    const products = ref([])
    const getProductsList = async () => {
      const data = await productApi.getProduct()
      // console.log(data)
      products.value = data
      // console.log(products.value[0].title)
    }

    return {
      products,
      getProductsList
    }
  },
  {
    persist: true
  }
)
