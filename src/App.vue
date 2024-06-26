<script setup>
import { useProductsStore } from '@/stores'
import { productsList, getCollection } from '@/utils/localStorage'
import { addToCollection, removeCollection } from '@/utils/collect'
import { onBeforeMount, ref, provide, computed } from 'vue'

const productsStore = useProductsStore()

const getProductList = () => {
  if (!productsList().length) {
    productsStore.getProductsList()
  }
}
const products = computed(() => productsStore.products)
const collection = ref(getCollection())
const collect = (id) => {
  addToCollection(id)
  collection.value = getCollection()
}
const cancelCollect = (id) => {
  removeCollection(id)
  collection.value = getCollection()
}
const isProductInCollection = (id) => {
  return collection.value.some((product) => product.id === id)
}

provide('collect', {
  products,
  collection,
  collect,
  cancelCollect,
  isProductInCollection
})
onBeforeMount(() => getProductList())
</script>
<template>
  <router-view></router-view>
</template>
<style lang="scss"></style>
