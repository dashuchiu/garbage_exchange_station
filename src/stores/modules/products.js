import { defineStore } from 'pinia'
import { ref } from 'vue'
import { productApi } from '@/api/mock/module/data'
import { productsList, getCollection } from '@/utils/localStorage'

export const useProductsStore = defineStore(
  'products',
  () => {
    const products = ref(productsList)
    const getProductsList = async () => {
      const data = await productApi.getProduct()
      // console.log(data)
      products.value = data
    }
    const setProductList = (val) => {
      products.value = val
    }

    return {
      products,
      getProductsList,
      setProductList
    }
  },
  {
    persist: true
  }
)
