<script setup>
import LayoutContainer from '@/components/layout/LayoutContainer.vue'
import { copyByText } from '@/utils/copy'
import { Link, UserFilled } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import { ref, inject, computed } from 'vue'
import { countDown } from '@/utils/common'
import { useUserStore, useProductsStore } from '@/stores'

const input = ref('')
const rate = ref(3.7)
const route = useRoute()
const routeId = route.params.id
const productUrl = ref(window.location.href)
const userStore = useUserStore()
const productsStore = useProductsStore()
const userEmail = ref(userStore.userInfo.email)
const { isProductInCollection, collect, products } = inject('collect')

const totalProducts = ref(products.value)
const product = computed(() =>
  totalProducts.value.find((product) => product.id === routeId)
)
const getCountDown = computed(() => countDown(routeId))

//留言
const avatarName = (name) => {
  return name.slice(0, 2)
}
//只取@之前的帳號名稱
const userName = computed(() => {
  return userEmail.value.split('@')[0]
})

const handleInput = (val) => {
  console.log(val)
  input.value = val
}
const addComment = () => {
  const newProducts = productsStore.products.map((item) => {
    if (item.id === product.value.id) {
      item.comments = [
        {
          id: Math.floor(Math.random() * 1000),
          author: userName.value,
          avatar: userName.value.slice(0, 2),
          content: input.value
        },
        ...item.comments
      ]
      return item
    }
    return item
  })
  totalProducts.value = newProducts
  productsStore.setProductList(newProducts)
  input.value = ''
}
//點擊我要廢物輸入金額
const inputPrice = () => {
  ElMessageBox.prompt('請輸入金額', '我要廢物', {
    confirmButtonText: '確認',
    cancelButtonText: '取消',
    inputPattern: /^(0|[1-9][0-9]{0,4}|100000)$/,
    inputErrorMessage: '請出入金額0-100000'
  })
    .then(({ value }) => {
      ElMessage({
        type: '出價成功',
        message: `出價金額為:${value}元`
      })
    })
    .catch(() => {
      ElMessage({
        type: '提示',
        message: '出價取消'
      })
    })
}
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
                  @click="collect(product.id)"
                  class="material-symbols-outlined"
                  :class="{ fillLove: isProductInCollection(product.id) }"
                >
                  favorite
                </span>
              </div>
            </div>
          </el-col>
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
              <span>倒數{{ getCountDown }}天</span>
            </div>
            <div class="buy-items">
              <el-button
                @click="inputPrice"
                class="buy"
                type="primary"
                round
                size="large"
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
            <div class="userName">{{ userName }}</div>
            <el-input
              @input="handleInput"
              v-model.trim="input"
              style="width: 92%; height: 40px"
              placeholder="留個言吧"
            />
          </div>
          <el-button @click="addComment" class="buy" type="primary" size="large"
            >送出</el-button
          >
        </div>
        <div
          class="comment-box"
          v-for="item in product.comments"
          :key="item.id"
        >
          <el-avatar>{{ avatarName(item.author) }}</el-avatar>
          <div>{{ avatarName(item.author) }}</div>
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
    align-items: center;
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
