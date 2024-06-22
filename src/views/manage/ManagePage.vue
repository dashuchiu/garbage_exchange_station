<script setup>
import LayoutContainer from '@/components/layout/LayoutContainer.vue'
import { productsList, setProducts } from '@/utils/localStorage'
import { Edit, Delete } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const products = ref(productsList())
// const route = useRoute()
const router = useRouter()
// const routeId = route.params.id
// const product = computed(() =>
//   products.value.find((product) => product.id === routeId)
// )

const editProduct = (id) => {
  // console.log(id)
  router.push(`/main/publish/${id}`)
}
const deleteProduct = (id) => {
  const newProduct = products.value.filter((product) => product.id !== id)
  products.value = newProduct
  setProducts(newProduct)
}
</script>
<template>
  <LayoutContainer>
    <template #content>
      <div class="product-items">
        <el-container class="items">
          <el-card shadow="hover" v-for="item in products" :key="item.id">
            <template #header>{{ item.title }}</template>
            <el-image
              style="width: 200; height: 250px"
              :src="item.img"
              fit="contain"
            />
            <span class="btn"
              ><el-button
                @click="editProduct(item.id)"
                :icon="Edit"
                circle
                plain
                type="primary"
              />
              <el-button
                class="btn-del"
                :icon="Delete"
                @click="deleteProduct(item.id)"
                circle
                plain
                type="danger"
              />
            </span>

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
.product-items {
  margin: 20px 0;

  .items {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    max-width: 1300px;
    margin: 0 auto;

    .el-card {
      margin: 0 20px;
      margin-bottom: 20px;
      flex-basis: calc(25% - 42px);
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
          .btn {
            position: absolute;
            top: 20px;
            right: 20px;
            min-height: 36px;
            min-width: 32px;

            .btn-del {
              margin-left: 8px;
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
