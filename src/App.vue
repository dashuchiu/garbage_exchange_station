<script setup>
import { useProductsStore } from '@/stores'
import { productsList } from '@/utils/localStorage'

const productsStore = useProductsStore()

const getProductList = () => {
  if (!productsList().length) {
    productsStore.getProductsList()
  }
}
getProductList()
</script>
<template>
  <router-view></router-view>
</template>
<style lang="scss"></style>
