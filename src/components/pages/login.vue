<template>
 <div class="register">
     <van-nav-bar
     title="用户登录"
     left-text="返回"
     left-arrow
     @click-left="goBack"
     >
    </van-nav-bar>
    <div class="register-content">
        <van-field
        v-model="username"
        label="用户名"
        icon="clear"
        placeholder="请输入用户名"
        required
        @click-icon="username = ''"
        :error-message='usernameErrorMsg'
        ></van-field>

        <van-field
        v-model="password"
        type="password"
        label="请输入密码"
        placeholder="请输入密码"
        required
        :error-message='passwordErrorMsg'
        >
        </van-field>
        <div class="register-button">
            <van-button type="primary" @click="loginAction" size="large" :loading="openLoading">登录</van-button>
        </div>
        <div class="login-href">
            <a href="/register">没有账号，点击这里注册</a>
        </div>
    </div>
 </div>
</template>

<script>
import axios from 'axios'
import API from '@/api/api.js'
import { Toast } from 'vant'

export default {
  data () {
    return {
      username: '',
      password: '',
      openLoading: false, // 是否开启用户的loading状态
      usernameErrorMsg: '', // 用户名出现错误时的提示信息
      passwordErrorMsg: '' // 密码出现错误时的提示信息
    }
  },
  created () {
    if (localStorage.user) {
      Toast.success('你已经登录过了')
      this.$router.push('/')
    }
  },
  methods: {
    goBack: function () {
      this.$router.go(-1)
    },

    axiosloginUser () {
      this.openLoading = true
      axios({
        url: API.loginUser,
        method: 'post',
        data: {
          username: this.username,
          password: this.password
        }
      }).then(response => {
        console.log(response)
        if (response.data.code === 200 && response.data.passwordok === true) {
          new Promise((resolve, reject) => {
            let userInfo = {username: this.username}
            localStorage.setItem('user', JSON.stringify(userInfo))
            setTimeout(() => { resolve() }, 500)
          }).then(() => {
            console.log(localStorage.user)
            Toast.success('登录成功')
            this.$router.push('/')
          }).catch(err => {
            Toast.fail('登录状态保存失败')
            console.log(err)
          })
        } else if (response.data.code === 200 && response.data.passwordok === false) {
          Toast.fail('登录失败')
          this.passwordErrorMsg = response.data.message
          this.openLoading = false
        } else {
          Toast.fail('登录失败')
          this.usernameErrorMsg = response.data.message
          this.openLoading = false
        }
      }).catch((error) => {
        Toast.fail('登录失败')
        console.log(error)
      })
    },
    // login 方法
    loginAction () {
      this.checkForm() && this.axiosloginUser()
    },

    // 表单验证方法
    checkForm () {
      let isOK = true
      if (this.username.length < 5) {
        this.usernameErrorMsg = '用户名不能小于5位'
        isOK = false
      } else {
        this.usernameErrorMsg = ''
      }
      if (this.password.length < 6) {
        this.passwordErrorMsg = '密码不能少于6位'
        isOK = false
      } else {
        this.passwordErrorMsg = ''
      }
      return isOK
    }
  },
  components: {

  }
}
</script>

<style scoped>
.register-content{
 width:96%;
 margin:20px auto;
 padding-bottom:50px;
}
.register-content div{
    margin-bottom: 10px;
}
.register-button{
    padding-top: 10px;
}
.login-href a{
    width: 100%;
    text-align: center;
    font-size: 14px;
    color: #666666;
    text-decoration: underline;
    margin: 10px auto;
    display:block;
}
</style>
