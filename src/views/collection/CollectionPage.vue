<script setup>
import LayoutContainer from '@/components/layout/LayoutContainer.vue'
import { setCollection, getCollection } from '@/utils/localStorage'
import { ref } from 'vue'
const products = ref(getCollection())
console.log(products)

//搜尋功能
const search = (val) => {
  const keyword = val.trim() // 搜尋
  const filterProducts = products.value.filter((product) =>
    product.title.includes(keyword)
  )
  products.value = filterProducts
}

//移除收藏
const removeCollection = (id) => {
  const collection = getCollection()
  const selectedProduct = products.value.find((product) => product.id === id)
  const check = collection.every((product) => product.id !== selectedProduct.id)
  if (check) {
    setCollection([...collection, selectedProduct]) // 收藏
  } else {
    const newCollection = collection.filter((product) => product.id !== id)
    setCollection(newCollection) // 移除收藏
    products.value = newCollection
  }
}
const isProductInCollection = (id) => {
  const collection = getCollection()
  return collection.some((product) => product.id === id)
}
</script>
<template>
  <LayoutContainer @search="search">
    <template #content>
      <div class="btn-container">
        <el-button round size="large">全部刪除</el-button>
      </div>
      <div class="product-items">
        <el-container class="items">
          <el-card shadow="hover" v-for="item in products" :key="item.id">
            <template #header>{{ item.title }}</template>
            <el-image
              style="width: 200; height: 250px"
              :src="item.img"
              fit="contain"
            />
            <template #footer>
              <el-row justify="space-between">
                <el-col
                  class="love"
                  :class="{ fillLove: isProductInCollection(item.id) }"
                  :span="6"
                  ><span
                    @click="removeCollection(item.id)"
                    class="material-symbols-outlined"
                  >
                    favorite
                  </span></el-col
                >
                <el-col class="price" :span="8"
                  ><el-text size="large" tag="b"
                    >NT$ {{ item.price }}</el-text
                  ></el-col
                >
              </el-row>
            </template>
          </el-card>
        </el-container>
      </div>
    </template>
  </LayoutContainer>
</template>
<style lang="scss" scoped>
.btn-container {
  // border: 1px solid black;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
}
.product-items {
  margin: 20px 0;
  // border: 1px solid black;
  .items {
    // border: 1px solid black;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    max-width: 1300px;
    margin: 0 auto;

    .el-card {
      margin: 0 20px;
      margin-bottom: 20px;
      flex-basis: calc(25% - 42px); // 减去 el-card 預設有帶boder的宽度 & margin
      // &:nth-child(4n) {
      //   margin-right: 0px;
      // }
      cursor: pointer;
      .el-image {
        left: 50%;
        transform: translateX(-50%);
      }
      .love {
        justify-content: flex-start;
      }
      .price {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>
