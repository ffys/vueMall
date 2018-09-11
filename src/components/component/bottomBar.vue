<template>
 <div class="bottom-nav">
 <van-tabbar v-model="active" @change="changeTabbar(active)">
            <van-tabbar-item icon="shop">首页</van-tabbar-item>
            <van-tabbar-item icon="records">列表页</van-tabbar-item>
            <van-tabbar-item icon="cart">购物车页</van-tabbar-item>
            <van-tabbar-item icon="contact" info="20">会员中心</van-tabbar-item>
        </van-tabbar>
 </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  },
  methods: {
    changeTabbar (active) {
      console.log(active)
      switch (active) {
        case 0:
          this.$router.push({name: 'shoppingMall'})
          break
        case 1:
          this.$router.push({name: 'categoryList'})
          break
        case 2:
          this.$router.push({name: 'cart'})
          break
        case 3:
          this.$router.push({name: 'user'})
          break
      }
    }
  },
  components: {

  }
}
</script>

<style scoped>
</style>
<style>
.van-tabbar-item{
  font-size: .8rem;
  color: #333;
}
.van-tabbar-item__icon{
  font-size: 1.2rem;
}
.van-tabbar{
  height:3.1rem;
}
</style>
