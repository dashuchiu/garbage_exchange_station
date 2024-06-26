<script setup>
import LayoutContainer from '@/components/layout/LayoutContainer.vue'
import { useRouter } from 'vue-router'
import { ref, reactive } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
const router = useRouter()
const form = ref()
const userStore = useUserStore()
//表單
const formModel = reactive({
  nickname: '',
  avatar: ''
})
//上傳圖片相關
const imgUrl = ref('')
const onUploadFile = (uploadFile) => {
  imgUrl.value = URL.createObjectURL(uploadFile.raw) //預覽圖片
  formModel.img = imgUrl.value
  console.log(uploadFile)
}

const update = () => {
  userStore.accountInfo.nickName = formModel.nickname
  userStore.accountInfo.avatar = formModel.img
  router.push('/main')
}
</script>
<template>
  <LayoutContainer>
    <template #content>
      <div class="container">
        <!-- 丟廢物表單 -->
        <el-form
          :rules="rules"
          :model="formModel"
          ref="form"
          label-width="100px"
          status-icon
        >
          <el-form-item label="暱稱" prop="nickname">
            <el-input
              v-model="formModel.nickname"
              placeholder="請輸入暱稱"
            ></el-input>
          </el-form-item>

          <el-form-item label="頭像" prop="avatar">
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

          <el-form-item>
            <el-button @click="update" type="primary">更新</el-button>
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
}
</style>
