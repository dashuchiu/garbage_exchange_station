<script setup>
import { ref, reactive } from 'vue'
import { productsList } from '@/utils/localStorage'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import LayoutContainer from '@/components/layout/LayoutContainer.vue'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
const products = ref(productsList())
console.log(products)
//編輯器
const formModel = reactive({
  title: 'test123',
  cate_id: '',
  cover_img: '',
  content: '',
  price: ''
})

const editorOptions = reactive({
  modules: {
    toolbar: [
      // 工具栏配置
      ['bold', 'italic', 'underline', 'strike'], // 粗体、斜体、下划线、删除线
      [{ header: 1 }, { header: 2 }], // 标题1和标题2
      [{ list: 'ordered' }, { list: 'bullet' }], // 有序列表和无序列表
      [{ script: 'sub' }, { script: 'super' }], // 上标和下标
      [{ indent: '-1' }, { indent: '+1' }], // 缩进
      [{ direction: 'rtl' }], // 文字方向
      [{ size: ['small', false, 'large', 'huge'] }], // 字号
      [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题等级
      [{ color: [] }, { background: [] }], // 字体颜色和背景色
      [{ font: [] }], // 字体
      [{ align: [] }], // 对齐方式
      ['clean'] // 清除格式
    ]
  }
})
const onEditorChange = (event) => {
  console.log(event)
}
const post = () => {
  // 新增
  const newProducts = [...products.value, formModel]
  console.log(newProducts)
}

const value = ref('')
const options = ['收藏', '雜物', '其他']
//上傳圖片相關
const imgUrl = ref('')
const onUploadFile = (uploadFile) => {
  imgUrl.value = URL.createObjectURL(uploadFile.raw) //預覽圖片
  formModel.value.cover_img = uploadFile.raw
}
</script>
<template>
  <LayoutContainer>
    <template #content>
      <div class="container">
        <!-- 丟廢物表單 -->
        <el-form :model="formModel" ref="formRef" label-width="100px">
          <el-form-item label="廢物名稱" prop="title">
            <el-input
              v-model="formModel.title"
              placeholder="請輸入廢物名稱"
            ></el-input>
          </el-form-item>
          <el-form-item label="廢物分類" prop="cate_id">
            <el-select v-model="value" placeholder="請選擇">
              <el-option v-for="item in options" :key="item" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item label="廢物照片" prop="cover_img">
            <el-upload
              class="avatar-uploader"
              :show-file-list="false"
              :auto-upload="false"
              :on-change="onUploadFile"
            >
              <img v-if="imgUrl" :src="imgUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item label="廢物描述" prop="content">
            <div class="editor">
              <quill-editor
                :options="editorOptions"
                theme="snow"
                v-model:content="formModel.content"
                contentType="text"
                @update:content="onEditorChange($event)"
              >
              </quill-editor>
            </div>
          </el-form-item>
          <el-form-item label="廢物價格" prop="price">
            <el-input
              v-model="formModel.price"
              placeholder="請輸入廢物起標價格"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="post" type="primary">送出</el-button>
          </el-form-item>
        </el-form>
      </div>
    </template>
  </LayoutContainer>
</template>
<style lang="scss" scoped>
.container {
  width: 900px;
  margin: 20px auto;
  .avatar-uploader {
    :deep() {
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
      .el-upload {
        border: 1px dashed var(--el-border-color);
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);
      }
      .el-upload:hover {
        border-color: var(--el-color-primary);
      }
      .el-icon.avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        text-align: center;
      }
    }
  }
  .editor {
    width: 100%;
    :deep(.ql-editor) {
      min-height: 200px;
    }
  }
}
</style>
