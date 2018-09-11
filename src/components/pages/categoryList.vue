<template>
 <div class="category">
   <!-- 商品大类列表 -->
     <div class="category-list">
       <ul>
         <li
               v-for="(item, index) in categoryList"
               :key="index" @click="clickCategory(index ,item.ID)"
               :class="{categoryActive: categoryIndex == index}">
                 {{item.MALL_CATEGORY_NAME}}
          </li>
         </ul>
     </div>
     <div>
       <van-row>
         <van-col span="6">
           <!-- 商品小类列表 -->
           <div id="left-nav">
             <ul>
               <li
               v-for="(item, index) in categorySub"
               @click="clickCategorySub(index, item.ID)"
               :class="{categorySubActive: categorySubIndex == index}"
               :key="index">
                 {{item.MALL_SUB_NAME}}
               </li>
             </ul>
           </div>
         </van-col>
         <van-col span="18">
           <div id="right-content">
             <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
              <van-list
                v-model="loading"
                :finished="finished"
                @load="onLoad"
                class="load-div"
              >
                   <van-col span="12" v-for="(item, index) in goodsList" :key="index">
                      <goods-info :goods="item"></goods-info>
                    </van-col>
                </van-list>
             </van-pull-refresh>
           </div>
         </van-col>
       </van-row>
     </div>
 </div>
</template>

<script>
import axios from 'axios'
import API from '@/api/api.js'
import {Toast} from 'vant'
import goodsInfo from '../component/goodsInfoCategory'
export default {
  data () {
    return {
      categoryList: [],
      categoryIndex: 0,
      categorySubIndex: 0,
      categorySubId: '', // 商品子类ID
      categorySub: [],
      page: 1,
      goodsList: [],
      loading: false, // 上拉加载
      finished: false, // 上拉加载是否加载完所有数据
      isRefresh: false //  下拉加载

    }
  },
  methods: {
    // 获取商品大类信息
    getCategory () {
      axios({
        url: API.getCategoryList,
        method: 'get'
      }).then(response => {
        console.log(response)
        if (response.data.code === 200 && response.data.data) {
          this.categoryList = response.data.data
          this.getCategorySubList(this.categoryList[0].ID)
        } else {
          Toast.fail('服务器错误，数据获取失败')
        }

        console.log(this.categoryList)
      }).catch(error => {
        if (error) {
          console.log(error)
        }
      })
    },
    // 获取商品小类信息
    getCategorySubList (categoryId) {
      axios({
        url: API.getCategorySubList,
        method: 'post',
        data: {categoryId: categoryId}
      }).then(response => {
        console.log(response)
        if (response.data.code === 200 && response.data.data) {
          this.categorySub = response.data.data
          this.categorySubId = this.categorySub[0].ID
          this.onLoad()
        } else {
          Toast.fail('服务器错误，数据获取失败')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 获取对应商品小类的商品
    getGoodsList () {
      axios({
        url: API.getGoodsListByCategorySubId,
        method: 'post',
        data: {
          categorySubId: this.categorySubId,
          page: this.page
        }
      }).then(response => {
        console.log('小类ID' + this.categorySubId)
        console.log('小类数组长度' + response.data.data.length)
        console.log('页数' + this.page)
        if (response.data.code === 200 && response.data.data.length) {
          this.page++
          this.goodsList = this.goodsList.concat(response.data.data)
          console.log(this.goodsList)
        } else {
          this.finished = true
        }
        this.loading = false
      }).catch(error => {
        console.log(error)
      })
    },
    // 上拉加载事件

    onLoad () {
      console.log('onload')
      setTimeout(() => {
        this.categorySubId = this.categorySubId ? this.categorySubId : this.categorySub[0].ID

        this.getGoodsList()
      }, 500)
    },
    onRefresh () {
      setTimeout(() => {
        this.isRefresh = false
        this.finished = false
        this.goodsList = []
        console.log(this.goodsList)
        this.page = 1
        this.onLoad()
      }, 2500)
    },
    // 点击商品大类事件
    clickCategory (index, categoryId) {
      this.categoryIndex = index
      this.categorySubIndex = 0
      this.page = 1
      this.finished = false
      this.goodsList = []
      this.getCategorySubList(categoryId)
    },
    // 点击商品小类事件
    clickCategorySub (index, categorySubId) {
      this.categorySubIndex = index
      this.categorySubId = categorySubId
      this.goodsList = []
      this.finished = false
      this.page = 1
      this.onLoad()
    }
  },
  components: {goodsInfo},
  created () {
    this.getCategory()
  },
  mounted () {
    let winHeight = document.documentElement.clientHeight
    let winWidth = document.documentElement.clientWidth
    let rem = winWidth / 20
    document.getElementById('left-nav').style.height = winHeight - 7.5 * rem - 4 + 'px'
    document.getElementById('right-content').style.height = winHeight - 7.5 * rem - 4 + 'px'
  }
}
</script>

<style scoped>
.category{
  background-color: #eeeeee;
}
.category-list ul {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.category-list ul li{
  box-sizing: border-box;
  flex: 1;
  line-height: 2rem;
  padding:3px 3px 1px 3px;
  font-size:0.8rem;
  color: #333;
  text-align: center;
   border-bottom: 1px solid #eeeeee;
   background-color: #ffffff
}
#left-nav{
  background-color: #ffffff;
}
#left-nav ul li {
    line-height: 2rem;
    border-bottom:1px solid #E4E7ED;
    padding:3px;
    font-size:0.8rem;
    text-align: center;
    background-color: #ffffff
}
.category-list ul .categoryActive{
  border-bottom: 2px solid rgb(221, 56, 56)
}
#left-nav .categorySubActive{
  background-color: #eeeeee;
}
#right-content{
  overflow: scroll;
}
.load-div::after{
  content: '';
  display: block;
  clear: both;
}
</style>
