<script setup>
import { useRouter } from 'vue-router'
import LayoutContainer from '@/components/layout/LayoutContainer.vue'
import { inject } from 'vue'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
console.log(locale)
const { products, isProductInCollection, collect } = inject('collect')

const casual = [
  {
    id: 1,
    img: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    title: 'Fjallraven 15吋筆電包',
    price: 200,
    countDown: 25
  },
  {
    id: 2,
    img: 'https://cdn.dummyjson.com/product-images/25/4.jpg',
    title: '梅子粉',
    price: 50,
    countDown: 8
  }
]
const router = useRouter()
const moreProducts = () => {
  router.push(`/main/category`)
}
</script>
<template>
  <LayoutContainer>
    <template #content>
      <div class="bg dark-img-bg"></div>
      <div class="hero">
        <div class="block text-center">
          <span class="demonstration">//{{ t('common.popular') }}</span>
          <el-carousel height="400px" motion-blur>
            <el-carousel-item v-for="item in casual" :key="item.id">
              <el-row class="hot-items">
                <el-col :span="16">
                  <el-card shadow="always">
                    <el-image
                      style="width: 400px; height: 250px"
                      :src="item.img"
                      fit="cover"
                    />
                    <template #footer>{{ item.title }}</template>
                  </el-card></el-col
                >
                <el-col :span="8" class="hot-items-right">
                  <h3 class="title">目前價位</h3>
                  <h1 class="price">NT$ {{ item.price }}</h1>
                  <h3 class="title">倒數天數</h3>
                  <p class="day">{{ item.countDown }}天</p>
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
            <div class="love-btn">
              <span
                @click="collect(item.id)"
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
  background-image: url('@/assets/main_bg.png');
  background-size: cover;
  background-position: center;
  z-index: -5;
}
.hero {
  // border: 1px solid black;
  width: 55%;
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
      }

      .more {
        justify-content: flex-start;
        font-size: 14px;
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
  :deep() {
    .el-card__header,
    .el-card__footer {
      border: none;
    }
    .el-card__body {
      background-color: #f7f6f5;
    }
  }
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
</style>
