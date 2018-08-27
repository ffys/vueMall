<template>
 <div class="goods-item">
     <div class="goods-image">
         <img :src="goods.image">
     </div>
     <div class="goods-name">{{goods.name}}</div>
     <div class="goods-price">{{goods.price | moneyFilter}}</div>
 </div>
</template>

<script>
import {toMoney} from '@/filter/moneyFilter.js'
export default {
  props: {goods: {
    default: function () {
      return [
        {image: ' '},
        {name: ''},
        {price: ''}
      ]
    }
  }},
  data () {
    return {

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
    font-size: 12px;
    display: inline-block;
    overflow: hidden;
    line-height: 1.2em;
    height: 2.4em;
    text-align: center;
}
.goods-price{
    width:100%;
    text-align: center;
    font-size: 14px;
    color: #e5017d;
    line-height: 1.4em;
}
</style>
