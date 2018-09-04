<template>
 <div class="register">
     <van-nav-bar
     title="用户注册"
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
            <van-button type="primary" @click="registerAction" size="large" :loading="openLoading">注册</van-button>
        </div>
        <div class="login-href">
            <a href="/login">已有账号，点击这里登录</a>
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
      openLoading: false, // 是否开启用户注册的loading状态
      usernameErrorMsg: '', // 用户名出现错误时的提示信息
      passwordErrorMsg: '' // 密码出现错误时的提示信息
    }
  },
  methods: {
    goBack: function () {
      this.$router.go(-1)
    },
    axiosRegisterUser () {
      this.openLoading = true
      axios({
        url: API.registerUser,
        method: 'post',
        data: {
          username: this.username,
          password: this.password
        }
      }).then(response => {
        // 如果返回code=200,代表注册成功，我们给用户作Tast提示
        if (response.data.code === 200) {
          Toast.success('注册成功,返回首页')
          this.goBack()
        } else if (response.data.message === '用户名重复') {
          this.openLoading = false
          Toast.fail('注册失败')
          this.usernameErrorMsg = '用户名已经被注册了'
        } else {
          console.log(response.data.message)
          this.openLoading = false
          Toast.fail('注册失败')
        }
      }).catch((error) => {
        this.openLoading = false
        Toast.fail('注册失败')
        console.log(error)
      })
    },
    registerAction () {
      this.checkForm() && this.axiosRegisterUser()
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
    width: 11em;
    font-size: 14px;
    color: #666666;
    text-decoration: underline;
    margin: 10px auto;
    display:block;
}
</style>
