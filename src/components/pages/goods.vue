<template>
 <div class="goods-info">
   <div class="nav-bar">
     <van-nav-bar
     title="商品详情"
     left-text="返回"
     left-arrow
     @click-left="onClickleft"
     ></van-nav-bar>
   </div>

     <div class="topimage">
       <img :src="goodsInfo.IMAGE1" alt="" @error="imgError" width="100%">
     </div>

     <div class="goods-name">{{goodsInfo.NAME}}</div>
     <div class="goods-price">
       <span class="new-price">￥{{goodsInfo.PRESENT_PRICE | moneyFilter}}</span>
       <span class="old-price">(<del>￥{{goodsInfo.ORI_PRICE | moneyFilter}}</del>)</span>
     </div>
     <div>
       <van-tabs swipeable sticky>
         <van-tab title="商品详情">
            <div class="goodsDetail" v-html="goodsInfo.DETAIL"> </div>
         </van-tab>
          <van-tab title="评价">
            <div class="goods-recommend">
              正在制作中
            </div>
        </van-tab>
       </van-tabs>
     </div>

     <div class="goods-bottom">
       <div>
         <van-button size="large" class="goods-car" @click="addCart">加入购物车</van-button>
       </div>
        <div>
         <van-button size="large" class="goods-buy">直接购买</van-button>
       </div>
     </div>
   </div>

</template>

<script>
import axios from 'axios'
import API from '@/api/api'
import {Toast} from 'vant'
import { toMoney } from '@/filter/moneyFilter.js'
export default {
  data () {
    return {
      goodsId: '',
      goodsInfo: {}
    }
  },
  created () {
    this.goodsId = this.$route.query.goodsId
    console.log(this.goodsId)
    this.getInfo()
  },
  methods: {
    // 根据传过来的商品ID，从数据库中获取商品参数
    getInfo () {
      axios({
        url: API.getDatailGoodsInfo,
        method: 'post',
        data: {
          goodsId: this.goodsId
        }
      }).then(response => {
        console.log(response)
        if (response.data.code === 200 && response.data.data) {
          this.goodsInfo = response.data.data
        } else {
          Toast.fail('服务器错误，数据获取失败')
        }
      })
        .catch(error => {
          console.log(error)
        })
    },
    onClickleft () {
      this.$router.go(-1)
    },
    imgError () {
      this.goodsInfo.IMAGE1 = require('../../assets/images/imgError.png')
    },
    addCart () {
      // 取出本地储存的购物车商品数据
      let cartInfo = localStorage.cartInfo ? JSON.parse(localStorage.cartInfo) : []
      // 判断购物车是否已经有 这个要加入购物车的商品
      let isHaveGoods = cartInfo.find(cart => cart.goodsId === this.goodsId)
      if (!isHaveGoods) {
        let newGoodsInfo = {
          goodsId: this.goodsInfo.ID,
          name: this.goodsInfo.NAME,
          image: this.goodsInfo.IMAGE1,
          price: this.goodsInfo.PRESENT_PRICE,
          isSelect: true,
          count: 1
        }
        // 加入这个商品到本地储存
        cartInfo.push(newGoodsInfo)
        localStorage.cartInfo = JSON.stringify(cartInfo)
        Toast.success('添加成功')
      } else {
        Toast.fail('此商品已在购物车')
      }
      this.$router.push({name: 'cart'}) // 跳转到购物车
    }

  },
  filters: {
    moneyFilter (val) {
      return toMoney(val)
    }
  }
}
</script>

<style scoped>
.goods-name{
  font-size: 1rem;
  line-height: 2em;

}
.goods-price .new-price{
  line-height: 2em;
  font-size: 1rem;
  font-weight: bold;
  color: rgb(231, 45, 101)
}
.goods-price .old-price{
   line-height: 2em;
  font-size: 0.8rem;
  color: #666666;
}
.goodsDetail{
  font-size: 0;
}
.goods-recommend{
  height: 200px;
}
.goods-bottom{
  position: fixed;
  bottom: 0px;
  left: 0px;
  background: #eeeeee;
  width: 100%;
  font-size: 1rem;
  display: flex;
  flex-direction: row;
  flex-flow: nowrap;
  z-index: 999;
}
.goods-bottom div{
  flex: 1;
  padding: 1px;
}
.goods-bottom div button{
  font-size: 1rem;
 height: 3rem;
 line-height: 3rem;
}
.goods-buy{
  color: #eeeeee;
  background-color: red
}
</style>
<style>
.goods-info .van-tabs__line {
    bottom: 0px;
}
.van-tab{
  font-size:0.8rem;
  line-height: 3rem;
}
.van-tabs--line .van-tabs__wrap{
  height: 3rem;
}
.van-toast--default{
  width:7.5rem;
}
.van-toast--default .van-toast__text{
  font-size: 0.8rem;
}
.van-toast--default .van-toast__icon{
  font-size: 3rem;
}
</style>
