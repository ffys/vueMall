<template>
  <div>
    <search-bar></search-bar>
    <div class="main-div">
      <router-view></router-view>
    </div>

    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import searchBar from '../component/searchBar'
import bottomBar from '../component/bottomBar'
import { Toast } from 'vant'
export default {
  data () {
    return {

    }
  },
  components: {
    searchBar,
    bottomBar
  },
  methods: {
    loginTest () {
      if (localStorage.user) {
        let user = JSON.parse(localStorage.user)
        Toast.success(user.username + '已登录')
      } else {
        Toast.fail('您还没有登录，将跳转到登录界面')
        this.$router.push('/login')
      }
    }
  },
  created () {
    this.loginTest()
  }

}
</script>

<style scoped>
.main-div {
  padding-bottom: 3rem;
}
</style>
