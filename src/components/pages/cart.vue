<template>
    <div class="cart">
        <van-nav-bar class="cart-nav" title="购物车" left-text="返回" left-arrow @click-left="goBack" @click-right="clickRight">
            <div slot="right" style="color:#38f">{{rightText}}</div>
        </van-nav-bar>
        <div class="cart-content">
            <div class="cart-item" v-for="(item, index) in cartInfo" :key="index">
                <div class="cart-select" @click="setSelect(index)">
                    <svg class="icon" aria-hidden="true" v-if="item.isSelect==false">
                        <use xlink:href="#icon-choose"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true" v-if="item.isSelect==true">
                        <use xlink:href="#icon-xuanze"></use>
                    </svg>
                    <input type="checkbox" checked style="display:none">
                </div>
                <div class="cart-img" @click="goGoods(item.goodsId)">
                    <img :src="item.image" :alt="item.name" width='100%'>
                </div>
                <div class="cart-info" @click="goGoods(item.goodsId)">
                    <p>{{item.name}}</p>
                    <p>
                        <span class="price">￥{{item.price | moneyFilter}}</span>
                        <span class="goods-count">
                            <svg class="icon" aria-hidden="true" @click="numDown(item.count, index)" v-if="goodsSumShow==false">
                                <use xlink:href="#icon-jian"></use>
                            </svg>
                            <span v-if="goodsSumShow==true">× </span>{{item.count}}
                            <svg class="icon" aria-hidden="true" @click="numAdd(item.count, index)" v-if="goodsSumShow==false">
                                <use xlink:href="#icon-wuuiconxiangjifangda"></use>
                            </svg>
                        </span>
                    </p>
                </div>
            </div>
        </div>
        <div class="cart-deal">
            <div class="select-all" @click="clickSelectAll">

                <svg class="icon" aria-hidden="true" v-if="selectAll==false">
                    <use xlink:href="#icon-choose"></use>
                </svg>
                <svg class="icon" aria-hidden="true" v-if="selectAll==true">
                    <use xlink:href="#icon-xuanze"></use>
                </svg>
                <span>全选</span>

            </div>
            <div class="goods-sum" >
                <p v-if="goodsSumShow">总计：<span>￥{{goodsSum | moneyFilter}}</span>
                </p>
            </div>
            <div class="goods-click">
                <van-button size="large" :class="isDisabled ? '' : 'buttonActive'" :disabled='isDisabled' @click="dealClick">{{buttonText}}</van-button>
            </div>
        </div>
      <bottom-bar></bottom-bar>
    </div>
</template>

<script>
import { toMoney } from '@/filter/moneyFilter'
import { Toast } from 'vant'
import bottomBar from '../component/bottomBar'
export default {
  data () {
    return {
      rightText: '编辑',
      cartInfo: [],
      checked: true,
      selectAll: false, // 是否全部选中
      goodsSum: 0, // 所有选中商品的总价
      isDisabled: false, // 结算按钮是否 不可以点击
      goodsSumShow: true, // 总计是否显示
      buttonText: '结算'

    }
  },
  methods: {
    // 返回事件
    goBack () {
      this.$router.go(-1)
    },
    // 点击进入商品详情页
    goGoods (goodsId) {
      this.$router.push({name: 'goods', query: {goodsId: goodsId}})
    },
    // 启动编辑购物车事件
    clickRight () {
      if (this.rightText === '编辑') {
        this.rightText = '完成'
        this.goodsSumShow = false
        this.buttonText = '删除'
        this.cartInfo.map((item, index) => {
          item.isSelect = false
        })
        this.isSelectAll()
      } else {
        this.rightText = '编辑'
        this.goodsSumShow = true
        this.buttonText = '结算'
        this.cartInfo.map((item, index) => {
          item.isSelect = false
        })
        this.computePrice()
      }
    },
    // 从localStorage 中获取购物车商品信息
    getCartInfo () {
      this.cartInfo = localStorage.cartInfo
        ? JSON.parse(localStorage.cartInfo)
        : []
      console.log(this.cartInfo)
    },
    // 改变选择商品
    setSelect (index) {
      this.cartInfo[index].isSelect = !this.cartInfo[index].isSelect
      this.isSelectAll()
      this.computePrice()
    },
    // 全选按钮事件
    clickSelectAll () {
      if (this.selectAll) {
        this.cartInfo.map((item, index) => {
          item.isSelect = false
        })
        this.selectAll = false
        this.isDisabled = true
      } else {
        this.cartInfo.map((item, index) => {
          item.isSelect = true
        })
        this.selectAll = true
        this.isDisabled = false
      }
    },
    // 点击结算按钮
    dealClick () {
      if (this.buttonText === '结算') {
        Toast.success('结算页面还在开发中')
        console.log('结算')
      } else {
        this.cartInfo.map((item, index) => {
          if (item.isSelect === true) {
            this.cartInfo.splice(index, 1)
          }
        })
        this.isSelectAll()
        Toast.success('删除商品成功')
      }
    },
    // 根据商品选中的情况，对结算按钮和全选按钮进行处理
    isSelectAll () {
      let trueNum = 0
      let goodsNum = this.cartInfo.length
      this.cartInfo.map((item, index) => {
        if (item.isSelect) {
          trueNum++
        }
      })
      if (trueNum > 0) {
        this.isDisabled = false
      } else if (trueNum === 0) {
        this.isDisabled = true
      }
      if (trueNum < goodsNum) {
        this.selectAll = false
      } else if (trueNum === goodsNum) {
        this.selectAll = true
      }
    },
    // 商品数量减
    numDown (num, index) {
      if (num <= 1) {
        Toast.fail('商品数量已经是最小了')
      } else {
        this.cartInfo[index].count = num - 1
      }
    },
    // 商品数量加
    numAdd (num, index) {
      if (num >= 99) {
        Toast.fail('商品数量已经是最大了')
      } else {
        console.log(index)
        console.log(this.cartInfo[index].name)
        this.cartInfo[index].count = num + 1
        console.log(this.cartInfo)
      }
    },
    // 商品价格计算
    computePrice () {
      this.goodsSum = 0
      this.cartInfo.map((item, index) => {
        if (item.isSelect) {
          this.goodsSum += item.price * item.count
        }
      })
    }
  },
  components: {bottomBar},
  created () {
    this.getCartInfo()
    this.isSelectAll()
    this.computePrice()
  },
  destroyed () {
    localStorage.cartInfo = JSON.stringify(this.cartInfo)
  },
  filters: {
    moneyFilter (money) {
      return toMoney(money)
    }
  }
}
</script>

<style scoped>

.cart-item {
  display: flex;
  border-bottom: 1px solid #eeeeee;
}
.cart-select {
  flex: 1;
  width: 100%;
  position: relative;
}
.cart-select .icon {
  font-size: 1.5rem;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -0.75rem;
  margin-left: -0.75rem;
}
.cart-img {
  flex: 3;
}
.cart-info {
  flex: 6;
}
.cart-info .price {
  color: rgb(204, 39, 39);
}
.goods-count {
  float: right;
  margin-right: 0.5rem;
  color: #999;
}
.goods-count .icon:first-child {
  margin-right: 0.3rem;
  color: #666;
  font-size: 1.2rem;
}
.goods-count .icon:last-child {
  margin-left: 0.3rem;
  color: #666;
  font-size: 1.2rem;
}
.cart-deal {
  width: 100%;
  display: flex;
  position: fixed;
  bottom: 3rem;
  left: 0px;
  border-bottom: 1px solid #eeeeee;
  border-top: 1px solid #eeeeee;
  background-color: #ffffff;
}
.cart-deal .goods-sum {
  flex: 5;
}
.cart-deal .goods-click{
    flex: 4;
}
.cart-deal .select-all{
    flex: 3;
}
.select-all .icon{
    color: #666;
  font-size: 1.5rem;
  margin: .75rem  0.5rem;

}
.select-all span{
    width: 2rem;
    display: block;
    float: right;
    line-height: 3rem;
    padding-right: .4rem;
    color: #666;
}
.goods-sum p{
    line-height: 3rem;
    margin: 0;
    text-align: right;
    padding-right: .5rem;
}
.goods-sum p span{
    color: rgb(204, 39, 39);
}
.goods-click button{
    font-size: 1.2rem;
    border-radius: 0;
    height: 100%;
    background-color:  #999999;
    color: #ffffff;
    }
.goods-click .buttonActive{
    background-color:  rgb(204, 39, 39);
}
</style>
<style>
.van-nav-bar__left, .van-nav-bar__right{
    font-size: 1rem;
}
.van-nav-bar__title{
    font-size:1.1rem;
}
.van-nav-bar{
    height: 2.85rem;
    line-height: 2.85rem;
}
</style>
