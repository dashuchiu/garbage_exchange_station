<script setup>
import { useRouter } from 'vue-router'
import {
  productsList,
  setCollection,
  getCollection
} from '@/utils/localStorage'
import LayoutContainer from '@/components/layout/LayoutContainer.vue'
import dayjs from 'dayjs'
import { ref } from 'vue'
const products = ref(productsList())

//搜尋功能
const search = (val) => {
  const keyword = val.trim() // 搜尋
  const filterProducts = products.value.filter((product) =>
    product.title.includes(keyword)
  )
  products.value = filterProducts
}

//收藏
const addToCollection = (id) => {
  const collection = getCollection()
  const selectedProduct = products.value.find((product) => product.id === id)
  const check = collection.every((product) => product.id !== selectedProduct.id)
  if (check) {
    setCollection([...collection, selectedProduct]) // 收藏
  } else {
    const newCollection = collection.filter((product) => product.id !== id)
    setCollection(newCollection) // 移除收藏
  }
}
const isProductInCollection = (id) => {
  const collection = getCollection()
  return collection.some((product) => product.id === id)
}

//倒數天數
const diffDays = ref(null)
const targetDate = dayjs('2024-04-01')
const today = dayjs()
diffDays.value = targetDate.diff(today, 'day')

const router = useRouter()
const moreProducts = () => {
  router.push(`/main/category`)
}
</script>
<template>
  <LayoutContainer @search="search">
    <template #content>
      <div class="bg"></div>
      <div class="hero">
        <div class="block text-center">
          <span class="demonstration">//本日熱門</span>
          <el-carousel height="400px" motion-blur>
            <!-- <el-carousel-item v-for="item in 4" :key="item">
              <h3 class="small justify-center" text="2xl">{{ item }}</h3>
            </el-carousel-item> -->
            <el-carousel-item>
              <el-row class="hot-items">
                <el-col :span="16">
                  <el-card shadow="always">
                    <el-image
                      style="width: 400px; height: 250px"
                      src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                      fit="cover"
                    />
                    <template #footer>漢堡</template>
                  </el-card></el-col
                >
                <el-col :span="8" class="hot-items-right">
                  <h3 class="title">目前價位</h3>
                  <h1 class="price">NT$ 666</h1>
                  <h3 class="title">倒數天數</h3>
                  <p class="day">{{ diffDays }}天</p>
                </el-col>
              </el-row>
            </el-carousel-item>
            <el-carousel-item>
              <el-row class="hot-items">
                <el-col :span="16">
                  <el-card shadow="always">
                    <el-image
                      style="width: 400px; height: 250px"
                      src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                      fit="cover"
                    />
                    <template #footer>漢堡</template>
                  </el-card></el-col
                >
                <el-col :span="8" class="hot-items-right">
                  <h3 class="title">目前價位</h3>
                  <h1 class="price">NT$ 666</h1>
                  <h3 class="title">倒數天數</h3>
                  <p class="day">{{ diffDays }}天</p>
                </el-col>
              </el-row>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
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
                <el-col
                  class="love"
                  :class="{ fillLove: isProductInCollection(item.id) }"
                  :span="6"
                  ><span
                    @click="addToCollection(item.id)"
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
.bg {
  // border: 1px solid black;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 500px;
  // background-color: #f4f4f4;
  background-image: url('@/assets/main_bg.png');
  background-size: cover;
  background-position: center;
  z-index: -5;
}
.hero {
  // border: 1px solid black;
  // height: 400px;
  width: 50%;
  margin: 15px auto;
  margin-bottom: 60px;
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
      .fillLove {
        color: #f69f58;
        font-variation-settings:
          'FILL' 100,
          'wght' 400,
          'GRAD' 0,
          'opsz' 24;
      }
      .price {
        justify-content: flex-end;
      }
    }
  }
}

.demonstration {
  color: var(--el-text-color-secondary);
}

.hot-items {
  height: 100%;

  .hot-items-right {
    flex-direction: column;
    align-items: flex-start;
    .title {
      line-height: 30px;
    }
    .price {
      font-size: 64px;
      color: #f69f58;
      margin-bottom: 20px;
    }
    .day {
      font-size: 36px;
    }
  }
}

h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

// .el-carousel__item:nth-child(2n) {
//   background-color: #99a9bf;
//   border: 1px solid black;
// }

// .el-carousel__item:nth-child(2n + 1) {
//   background-color: #ecdfcd;
//   border: 1px solid black;
// }
</style>
