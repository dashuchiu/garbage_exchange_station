<script setup>
import { productApi } from '@/api/mock/module/data'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const products = ref([])
const router = useRouter()
// mockApi
const getProduct = async () => {
  const data = await productApi.getProduct()
  console.log(data)
  products.value = data
  console.log(products.value[0].title)
}
getProduct()

const moreProducts = () => {
  router.push(`/main/more`)
}
</script>
<template>
  <div class="bg"></div>
  <el-container class="hero">
    <h1>本日熱門</h1>
  </el-container>
  <el-row justify="space-between">
    <el-col :span="10"><el-text size="large">最新廢物</el-text></el-col>
    <el-col :span="10"
      ><el-button @click="moreProducts" round size="large"
        >更多廢物</el-button
      ></el-col
    >
  </el-row>
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
            <el-col class="love" :span="6"
              ><span class="material-symbols-outlined"> favorite </span></el-col
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
<style lang="scss" scoped>
.bg {
  // border: 1px solid black;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 440px;
  background-color: #f4f4f4;
  z-index: -5;
}
.hero {
  border: 1px solid black;
  height: 400px;
  margin-bottom: 50px;
}
.el-col {
  // border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
}
.product-items {
  margin: 20px 0;
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
        justify-content: flex-end;
      }
    }
  }
}
</style>
