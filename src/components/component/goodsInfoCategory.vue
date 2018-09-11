<template>
 <div class="goods-item" @click="goGoodsPage()">
     <div class="goods-image">
         <img :src="goods.IMAGE1" @error="imgError">
     </div>
     <div class="goods-name">{{goods.NAME}}</div>
     <div class="goods-price">￥{{goods.PRESENT_PRICE | moneyFilter}} <del class="old-price">￥{{goods.ORI_PRICE | moneyFilter}}</del></div>
 </div>
</template>

<script>
import {toMoney} from '@/filter/moneyFilter.js'
export default {
  props: {goods: {
    default: function () {
      return [
        {IMAGE1: ' '},
        {NAME: ''},
        {ORI_PRICE: ''},
        {PRESENT_PRICE: ''},
        {ID: ''}
      ]
    }
  }},
  data () {
    return {

    }
  },
  methods: {
    goGoodsPage () {
      this.$router.push({name: 'goods', query: {goodsId: this.goods.ID}})
    },
    imgError () {
      this.goods.IMAGE1 = require('../../assets/images/imgError.png')
    }

  },
  filters: {
    moneyFilter (money) {
      return toMoney(money)
    }
  }
}
</script>

<style scoped>
.goods-item{
    margin:.15rem;
    background-color: #ffffff;
}
.goods-item img{
    width: 100%;
}
.goods-name{
    width:100%;
    font-size: 0.8rem;
    display: inline-block;
    overflow: hidden;
    line-height: 1.2em;
    height: 2.4em;
    text-align: center;
}
.goods-price{
    width:100%;
    text-align: center;
    font-size: 0.8rem;
    color: #e5017d;
    line-height: 1.4em;
}
.old-price{
  font-size: 0.8rem;
  color: #666666;
}
</style>
