<script setup>
import LayoutContainer from '@/components/layout/LayoutContainer.vue'
import { copyByText } from '@/utils/copy'
import { Link, UserFilled } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'
import { ref, computed } from 'vue'
import {
  productsList,
  setCollection,
  getCollection
} from '@/utils/localStorage'
import { commentApi } from '@/api/mock/module/data'
const input = ref('')
const rate = ref(3.7)
const route = useRoute()
const routeId = route.params.id
const collection = ref(getCollection())
const products = ref(productsList())
const product = computed(() =>
  products.value.find((product) => product.id === routeId)
)
const productUrl = ref(window.location.href)

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

//倒數天數
const diffDays = ref(null)
const targetDate = dayjs(product.value.date)
const today = dayjs()
diffDays.value = targetDate.diff(today, 'day')

//留言
const comment = ref([])
const getCommetList = async () => {
  const data = await commentApi.getComment()
  comment.value = data[routeId]
  comment.value.forEach((item) => {
    item.avatar = item.author.slice(0, 2)
  })
  console.log(comment.value)
}
getCommetList()
</script>
<template>
  <LayoutContainer>
    <template #content>
      <div class="container">
        <el-row>
          <el-col :span="15">
            <div class="img-container">
              <div
                class="img"
                :style="{ 'background-image': `url(${product.img})` }"
              ></div>
              <div class="love-btn">
                <span
                  @click="addToCollection(product.id)"
                  class="material-symbols-outlined"
                  :class="{ fillLove: isProductInCollection(product.id) }"
                >
                  favorite
                </span>
              </div>
            </div></el-col
          >
          <el-col class="imgCard-right" :span="9">
            <div class="product-title">{{ product.title }}</div>
            <div class="seller-card">
              <span
                ><el-avatar
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              /></span>
              <span class="seller-id">{{ product.author }}</span>
              <el-rate
                v-model="rate"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value} 好評"
              />
            </div>
            <div>
              <span class="price">NT$ {{ product.price }}</span>
            </div>
            <div class="time-items">
              <span class="material-symbols-outlined"> timer </span>
              <span>倒數{{ diffDays }}天</span>
            </div>
            <div class="buy-items">
              <el-button class="buy" type="primary" round size="large"
                >我要廢物</el-button
              >
              <el-button
                @click="copyByText(`${productUrl}`)"
                class="icon-link"
                :icon="Link"
                size="large"
                circle
              />
            </div>
          </el-col>
        </el-row>
        <div class="about-title">關於這個廢物</div>
        <div v-html="product.content" class="about-content"></div>
        <div class="replay-title">留言</div>
        <div class="replay-box">
          <div class="left">
            <el-avatar :icon="UserFilled" />
            <el-input
              v-model="input"
              style="width: 92%; height: 40px"
              placeholder="留個言吧"
            />
          </div>
          <el-button class="buy" type="primary" size="large">送出</el-button>
        </div>
        <div class="comment-box" v-for="item in comment" :key="item.id">
          <el-avatar>{{ item.avatar }}</el-avatar>
          <div>{{ item.author }}</div>
          <div class="comment-content">{{ item.content }}</div>
        </div>
      </div>
      <div class="box">
        <div
          class="box"
          :style="{ 'background-image': `url(${product.img})` }"
        ></div>
      </div>
    </template>
  </LayoutContainer>
</template>
<style lang="scss" scoped>
.buy-items {
  display: flex;
  justify-content: space-between;
  .icon-link {
    font-size: 20px;
  }
  .buy {
    width: 400px;
  }
}

.container {
  max-width: 1140px;
  margin: 20px auto;
  // border: 1px solid black;
  .img-container {
    // border: 1px solid black;
    width: 70%;
    display: block;
    margin: 0 auto;
    border-radius: 15px;
    overflow: hidden;
    &:before {
      content: '';
      // border: 1px solid rgb(190, 102, 102);
      display: block;
      width: 100%;
      padding-bottom: 75%;
    }
    .img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      transition: transform 0.2s;
    }
    &:hover .img {
      transform: scale(1.2);
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
      .fillLove {
        color: #f69f58;
        font-variation-settings:
          'FILL' 100,
          'wght' 400,
          'GRAD' 0,
          'opsz' 24;
      }
    }
  }
  .imgCard-right {
    padding-right: 20px;
    .product-title {
      font-size: 28px;
      line-height: 60px;
    }
    .seller-card {
      border: 1px solid #bababa;
      height: 55px;
      padding: 0 10px;
      border-radius: 10px;
      display: flex;
      align-items: center;

      .seller-id {
        margin: 0 10px;
      }
    }
    .price {
      font-size: 48px;
      line-height: 70px;
      color: #f69f58;
    }
    .time-items {
      // border: 1px solid black;
      display: flex;
      align-items: center;
      height: 40px;
    }
  }
}
.about-title {
  text-align: center;
  line-height: 60px;
  letter-spacing: 6px;
  border-top: 1px solid #bababa;
  border-bottom: 1px solid #bababa;
  margin: 40px 0;
}
.replay-title {
  text-align: center;
  line-height: 60px;
  letter-spacing: 6px;
  background-color: #f2f2f2;
  margin: 40px 0;
}
.replay-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;

  .left {
    display: flex;
    width: 100%;
    *:not(:last-child) {
      margin-right: 20px;
    }
  }
}
.comment-box {
  display: flex;
  align-items: center;
  line-height: 80px;
  border-top: 1px solid #bababa;
  // border-bottom: 1px solid #bababa;
  *:not(:last-child) {
    margin-right: 20px;
  }
  .comment-content {
    color: #bababa;
  }
}
</style>
