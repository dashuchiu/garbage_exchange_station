import { productsList, setCollection, getCollection } from './localStorage'
import { useUserStore } from '@/stores'

export const addToCollection = (id) => {
  const userStore = useUserStore()
  const collection = getCollection()
  const products = productsList()
  const selectedProduct = products.find((product) => product.id === id)
  const check = collection.every((product) => product.id !== selectedProduct.id)
  if (!userStore.token) {
    ElMessage('請先登入')
  } else if (check) {
    const newCollection = [...collection, selectedProduct]
    // 1. 存進數據庫
    setCollection(newCollection) // 收藏
    ElMessage.success('收藏成功')
  } else {
    const newCollection = collection.filter((product) => product.id !== id)
    // 1. 存進數據庫
    setCollection(newCollection) // 移除收藏
    ElMessage.success('移除收藏')
  }
}

export const removeCollection = (id) => {
  const collection = getCollection()
  const products = productsList()
  const selectedProduct = products.find((product) => product.id === id)
  const check = collection.every((product) => product.id !== selectedProduct.id)
  if (!check) {
    const newCollection = collection.filter((product) => product.id !== id)
    setCollection(newCollection) // 移除收藏
    products.value = newCollection
  }
}
