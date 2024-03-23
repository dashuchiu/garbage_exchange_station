<script setup>
import LayoutContainer from '@/components/layout/LayoutContainer.vue'
import { Link, UserFilled } from '@element-plus/icons-vue'
import { ref } from 'vue'
const input = ref('')
const value = ref(3.7)
const url =
  'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
</script>
<template>
  <LayoutContainer>
    <template #content>
      <div class="container">
        <el-row>
          <el-col :span="15"
            ><div class="img-wrapper">
              <img :src="url" alt="" /></div
          ></el-col>
          <el-col class="imgCard-right" :span="9">
            <div class="product-title">神奇寶貝卡</div>
            <div class="seller-card">
              <span
                ><el-avatar
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              /></span>
              <span class="seller-id">蒙布朗阿伯</span>
              <el-rate
                v-model="value"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value} 好評"
              />
            </div>
            <div><span class="price">NT$ 888</span></div>
            <div class="time-items">
              <span class="material-symbols-outlined"> timer </span>
              <span>倒數12天</span>
            </div>
            <div class="buy-items">
              <el-button class="buy" type="primary" round size="large"
                >我要廢物</el-button
              >
              <el-button class="icon-link" :icon="Link" size="large" circle />
            </div>
          </el-col>
        </el-row>
        <div class="about-title">關於這個廢物</div>
        <div class="about-content">
          鳥兒，是大自然的精靈，展翅飛翔於蒼穹之間，翩翩起舞於綠林間，它們的美妙身影和優雅姿態，總能給人們帶來無限的驚喜和感動。
          鳥兒的羽毛，如同一幅幅精美的畫作，色彩繽紛，紋路精細，輕輕飄動間，彷彿在空中繪畫出一幅美麗的圖畫。它們的歌聲，清脆悅耳，如同一首首動人的樂章，讓人們心曠神怡，感受到大自然的神奇和美好。
          鳥兒的生活，充滿了智慧和勇氣。它們在茂密的樹林中穿梭飛行，尋找食物和樂趣，不畏艱險，展現出頑強的生命力和適應能力。鳥兒的繁殖行為也是一種奇蹟，它們建立巢穴，孵化幼鳥，呵護後代，展現出無私的愛和責任。
          因此，讚美鳥兒是再合適不過的了。它們是大自然的瑰寶，是生命的奇跡，是我們應該珍惜和保護的寶貴資源。讓我們一起為鳥兒歡呼，讚美它們的美麗和偉大！
        </div>
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
        <div class="comment-box">
          <el-avatar> 王媽 </el-avatar>
          <div>喜歡蒙布朗的王媽媽</div>
          <div class="comment-content">這是什麼品種?</div>
        </div>
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
  .img-wrapper {
    overflow: hidden;
    transform: rotate(0deg);
    border-radius: 1rem;

    img {
      width: 100%;
      height: 100%;
      transition: scale 400ms;
      border-radius: 1rem;
      vertical-align: bottom;
    }
    &:hover img {
      scale: 110%;
      border-radius: 1rem;
    }
  }

  .imgCard-right {
    padding: 0 20px;
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
  border-bottom: 1px solid #bababa;
  *:not(:last-child) {
    margin-right: 20px;
  }
  .comment-content {
    color: #bababa;
  }
}
</style>
