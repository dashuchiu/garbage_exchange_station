<script setup>
import LayoutContainer from '@/components/layout/LayoutContainer.vue'
import {
  productsList,
  setCollection,
  getCollection
} from '@/utils/localStorage'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const products = ref(productsList())
const collection = ref(getCollection())
const router = useRouter()
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
  const selectedProduct = products.value.find((product) => product.id === id)
  const check = collection.value.every(
    (product) => product.id !== selectedProduct.id
  )
  if (check) {
    const newCollection = [...collection.value, selectedProduct]
    // 1. 存進數據庫
    setCollection(newCollection) // 收藏
    // 2. 改變狀態 => 重渲染畫面
    collection.value = newCollection
    ElMessage.success('收藏成功')
  } else {
    const newCollection = collection.value.filter(
      (product) => product.id !== id
    )
    // 1. 存進數據庫
    setCollection(newCollection) // 移除收藏
    // 2. 改變狀態 => 重渲染畫面
    collection.value = newCollection
    ElMessage.success('移除收藏')
  }
}
const isProductInCollection = (id) => {
  return collection.value.some((product) => product.id === id)
}
const filteredProducts = ref([])
const handleClick = (tab) => {
  filteredProducts.value = products.value.filter(
    (product) => product.category === String(tab.props.label)
  )
}
// const filteredProducts = computed(() =>
//   products.value.filter((product) => product.category === '雜物')
// )
</script>
<template>
  <LayoutContainer @search="search">
    <template #content>
      <div class="container">
        <el-tabs
          tab-position="right"
          class="demo-tabs"
          @tab-click="handleClick"
        >
          <el-tab-pane label="全部">
            <div class="product-items">
              <el-container class="items">
                <el-card shadow="hover" v-for="item in products" :key="item.id">
                  <template #header>{{ item.title }}</template>
                  <el-image
                    style="width: 200; height: 250px"
                    :src="item.img"
                    fit="contain"
                  />
                  <div class="love-btn">
                    <span
                      @click="addToCollection(item.id)"
                      class="material-symbols-outlined"
                      :class="{ fillLove: isProductInCollection(item.id) }"
                    >
                      favorite
                    </span>
                  </div>
                  <template #footer>
                    <el-row justify="space-between">
                      <el-col class="more" :span="8">
                        <el-link
                          @click="router.push(`/main/productDetail/${item.id}`)"
                          :underline="false"
                          >查看更多</el-link
                        >
                      </el-col>
                      <el-col class="price" :span="8"
                        ><el-text size="large" tag="b"
                          >NT$ {{ item.price }}</el-text
                        ></el-col
                      >
                    </el-row>
                  </template>
                </el-card>
              </el-container>
            </div></el-tab-pane
          >
          <el-tab-pane label="雜物">
            <div class="product-items">
              <el-container class="items">
                <el-card
                  shadow="hover"
                  v-for="item in filteredProducts"
                  :key="item.id"
                >
                  <template #header>{{ item.title }}</template>
                  <el-image
                    style="width: 200; height: 250px"
                    :src="item.img"
                    fit="contain"
                  />
                  <div class="love-btn">
                    <span
                      @click="addToCollection(item.id)"
                      class="material-symbols-outlined"
                      :class="{ fillLove: isProductInCollection(item.id) }"
                    >
                      favorite
                    </span>
                  </div>
                  <template #footer>
                    <el-row justify="space-between">
                      <el-col class="more" :span="8">
                        <el-link
                          @click="router.push(`/main/productDetail/${item.id}`)"
                          :underline="false"
                          >查看更多</el-link
                        >
                      </el-col>
                      <el-col class="price" :span="8"
                        ><el-text size="large" tag="b"
                          >NT$ {{ item.price }}</el-text
                        ></el-col
                      >
                    </el-row>
                  </template>
                </el-card>
              </el-container>
            </div></el-tab-pane
          >
          <el-tab-pane label="收藏">
            <div class="product-items">
              <el-container class="items">
                <el-card
                  shadow="hover"
                  v-for="item in filteredProducts"
                  :key="item.id"
                >
                  <template #header>{{ item.title }}</template>
                  <el-image
                    style="width: 200; height: 250px"
                    :src="item.img"
                    fit="contain"
                  />
                  <div class="love-btn">
                    <span
                      @click="addToCollection(item.id)"
                      class="material-symbols-outlined"
                      :class="{ fillLove: isProductInCollection(item.id) }"
                    >
                      favorite
                    </span>
                  </div>
                  <template #footer>
                    <el-row justify="space-between">
                      <el-col class="more" :span="8">
                        <el-link
                          @click="router.push(`/main/productDetail/${item.id}`)"
                          :underline="false"
                          >查看更多</el-link
                        >
                      </el-col>
                      <el-col class="price" :span="8"
                        ><el-text size="large" tag="b"
                          >NT$ {{ item.price }}</el-text
                        ></el-col
                      >
                    </el-row>
                  </template>
                </el-card>
              </el-container>
            </div></el-tab-pane
          >
          <el-tab-pane label="其他">
            <div class="product-items">
              <el-container class="items">
                <el-card
                  shadow="hover"
                  v-for="item in filteredProducts"
                  :key="item.id"
                >
                  <template #header>{{ item.title }}</template>
                  <el-image
                    style="width: 200; height: 250px"
                    :src="item.img"
                    fit="contain"
                  />
                  <div class="love-btn">
                    <span
                      @click="addToCollection(item.id)"
                      class="material-symbols-outlined"
                      :class="{ fillLove: isProductInCollection(item.id) }"
                    >
                      favorite
                    </span>
                  </div>
                  <template #footer>
                    <el-row justify="space-between">
                      <el-col class="more" :span="8">
                        <el-link
                          @click="router.push(`/main/productDetail/${item.id}`)"
                          :underline="false"
                          >查看更多</el-link
                        >
                      </el-col>
                      <el-col class="price" :span="8"
                        ><el-text size="large" tag="b"
                          >NT$ {{ item.price }}</el-text
                        ></el-col
                      >
                    </el-row>
                  </template>
                </el-card>
              </el-container>
            </div></el-tab-pane
          >
        </el-tabs>
      </div>
    </template>
  </LayoutContainer>
</template>
<style lang="scss" scoped>
.container {
  margin: 40px auto;
  max-width: 1200px;
  .demo-tabs > .el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
  }

  .el-tabs--right .el-tabs__content {
    height: 100%;
  }
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
      :deep() {
        .el-card__header,
        .el-card__footer {
          border: none;
        }
        .el-card__body {
          background-color: #f7f6f5;
          .el-image {
            left: 50%;
            transform: translateX(-50%);
          }
          .love-btn {
            position: absolute;
            top: 20px;
            right: 20px;
            min-height: 36px;
            min-width: 36px;
            background: #fff;
            border-radius: 40px;
            cursor: pointer;
            .material-symbols-outlined {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -40%);
            }
          }
        }
      }

      .more {
        justify-content: flex-start;
        font-size: 14px;
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
</style>
