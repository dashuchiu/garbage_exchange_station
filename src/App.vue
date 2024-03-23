<script setup>
import { useProductsStore } from '@/stores'
const productsStore = useProductsStore()
productsStore.getProductsList()
</script>
<template>
  <router-view></router-view>
</template>
<style lang="scss">
$font-color: #f69f58;
</style>
