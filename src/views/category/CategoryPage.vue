<script setup>
import LayoutContainer from '@/components/layout/LayoutContainer.vue'
import { useRouter } from 'vue-router'
import { ref, inject } from 'vue'
const router = useRouter()
const { products, collect, isProductInCollection } = inject('collect')

//收藏
const filteredProducts = ref([])
const handleClick = (tab) => {
  filteredProducts.value = products.value.filter(
    (product) => product.category === String(tab.props.label)
  )
}

const categories = ref([
  {
    label: '全部',
    products
  },
  {
    label: '雜物',
    products: filteredProducts
  },
  {
    label: '收藏',
    products: filteredProducts
  },
  {
    label: '其他',
    products: filteredProducts
  }
])
</script>
<template>
  <LayoutContainer>
    <template #content>
      <div class="container">
        <el-tabs
          tab-position="right"
          class="demo-tabs"
          @tab-click="handleClick"
        >
          <el-tab-pane
            v-for="category in categories"
            :key="category.label"
            :label="category.label"
          >
            <div class="product-items">
              <el-container class="items">
                <el-card
                  shadow="hover"
                  v-for="item in category.products"
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
