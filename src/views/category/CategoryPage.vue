<script setup>
import LayoutContainer from '@/components/layout/LayoutContainer.vue'
import { productsList } from '@/utils/localStorage'
const products = productsList()
</script>
<template>
  <LayoutContainer>
    <template #content>
      <div class="container">
        <el-tabs tab-position="right" class="demo-tabs">
          <el-tab-pane label="全部"
            ><div class="product-items">
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
                        ><span class="material-symbols-outlined">
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
            </div></el-tab-pane
          >
          <el-tab-pane label="雜物">雜物</el-tab-pane>
          <el-tab-pane label="收藏">收藏</el-tab-pane>
          <el-tab-pane label="其他">其他</el-tab-pane>
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
