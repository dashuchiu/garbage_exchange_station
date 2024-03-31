<script setup>
import LayoutContainer from '@/components/layout/LayoutContainer.vue'
import { setCollection } from '@/utils/localStorage'
import { inject } from 'vue'
import { useRouter } from 'vue-router'
const { collection, isProductInCollection, cancelCollect } = inject('collect')

const router = useRouter()

//全部移除
const allRemove = async () => {
  await ElMessageBox.confirm('你確定要全部移除嗎？', '稍等一下', {
    type: 'warning',
    confirmButtonText: '確認',
    cancelButtonText: '取消'
  })
  setCollection([])
  collection.value = []
}
</script>
<template>
  <LayoutContainer>
    <template #content>
      <div class="btn-container">
        <el-button @click="allRemove" round size="large">全部移除</el-button>
      </div>
      <div class="product-items">
        <el-container class="items">
          <el-card shadow="hover" v-for="item in collection" :key="item.id">
            <template #header>{{ item.title }}</template>
            <el-image
              style="width: 200; height: 250px"
              :src="item.img"
              fit="contain"
            />
            <div class="love-btn">
              <span
                @click="cancelCollect(item.id)"
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
.btn-container {
  // border: 1px solid black;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
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
</style>
