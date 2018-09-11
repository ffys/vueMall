<template>
  <div class="content">

    <!-- Swiper area -->
    <div class="swiper-area">
      <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(banner, index) in banerList" :key="index">
             <img :src="banner.image"/>
         </van-swipe-item>
      </van-swipe>
    </div>
    <!-- type bar -->
    <div class="type-bar">
      <div v-for="(cate,index) in category" :key="index">
        <img v-lazy="cate.image" width="90%">
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>
    <!-- adbanner area -->
    <div class="adbanner-area">
      <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%">
    </div>
    <!-- recommend goods area -->
    <div class="recommend-area">
      <div class="recommend-title">
        商品推荐
      </div>
      <div class="recommend-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item, index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img :src="item.image" width="80%" alt="">
              <div>{{item.goodsName}}</div>
              <div>¥{{item.price}} （¥{{item.mallPrice}}）</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!-- floor-area -->
    <floor-component :floorData="floor1" :floorTitle="floorName.floor1"></floor-component>
    <floor-component :floorData="floor2" :floorTitle="floorName.floor2"></floor-component>
    <floor-component :floorData="floor3" :floorTitle="floorName.floor3"></floor-component>
    <!-- hot-goods -->
    <div class="hot-goods">
      <div class="hot-title">热卖商品</div>
      <div class="hot-content">
        <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        >
          <van-col span="12" v-for="(item, index) in hotGoods" :key="index">
            <goods-info :goods="item"></goods-info>
          </van-col>
        </van-list>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
// 局部引入vue-awesome-swiper
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
// 引入组件
import floorComponent from '../component/floorComponent'
import goodsInfo from '../component/goodsInfoComponent'
// API
import API from '@/api/api'
export default {
  data () {
    return {
      swiperOption: {
        slidesPerView: 3
      },
      banerList: [],
      category: [],
      adBanner: '',
      recommendGoods: [],
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: [],
      hotGoods: [],
      hotGoodsSet: [],
      loading: false,
      finished: false
    }
  },
  components: {
    swiper,
    swiperSlide,
    floorComponent,
    goodsInfo
  },
  methods: {
    onLoad () {
      setTimeout(() => {
        for (let i = 0; i < 4; i++) {
          const hotLength = this.hotGoods.length + 1
          this.hotGoods.push(this.hotGoodsSet[hotLength - 1])
        }
        this.loading = false
        console.log(this.hotGoodsSet)
        if (this.hotGoods.length >= this.hotGoodsSet.length && this.hotGoodsSet.length > 4) {
          this.finished = true
          console.log(this.finished)
          console.log(this.hotGoods)
          console.log(this.hotGoodsSet.length)
        }
        // this.hotGoods.length >= this.hotGoodsSet.length ? this.finished = true : this.finished = false
      }, 500)
    }
  },
  created () {
    axios({
      url: API.getShoppingMallInfo,
      method: 'get'
    })
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          this.banerList = response.data.data.slides
          this.category = response.data.data.category
          this.adBanner = response.data.data.advertesPicture
          this.recommendGoods = response.data.data.recommend
          this.floor1 = response.data.data.floor1
          this.floor2 = response.data.data.floor2
          this.floor3 = response.data.data.floor3
          this.floorName = response.data.data.floorName
          this.hotGoodsSet = response.data.data.hotGoods
          this.hotGoods = this.hotGoodsSet.slice(0, 4)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>

<style scoped>
#app .content  {
  background-color: #eeeeee;
}
.swiper-area img{
  width: 100%;
}
.type-bar {
  background-color: #ffffff;
  margin: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: .8rem;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.type-bar div {
  width: 100%;
  text-align: center;
  padding: 0.3rem;
}
.recommend-area {
  background-color: #ffffff;
  margin-top: 0.3rem;
}
.recommend-title {
  color: #e5017d;
  font-size: 1rem;
  padding: 0.3rem;
  border-bottom: 1px solid #eeeeee;
}
.recommend-body {
  font-size: .8rem;
  border-bottom: 1px solid #eeeeee;
  text-align: center;
}
.recommend-item {
  box-sizing: border-box;
  width: 100%;
  border-right: 1px solid #eeeeee;
}
.hot-content>div::after{
  content: '';
  clear: both;
  display: block;
  height: 0;
  visibility: hidden;
}
.hot-title{
  font-size: 1rem;
  padding: .3rem;
  text-align: center;
  color: #e5017d;
}
</style>
