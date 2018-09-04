const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()
router.get('/', async (ctx) => {
  ctx.body = '这是用户操作首页'
})

router.post('/register', async (ctx) => {
  ctx.body = '用户注册接口'

  // 取得MongoDB 的Model
  const User = mongoose.model('User')

  console.log(ctx.request.body)

  // 把从前端接收的post数据封装成一个新的User对象
  let newUser = new User(ctx.request.body)

  // 用 mongoose  的save方法直接存储，然后判断是否成功，返回相应结果
  await newUser.save().then(() => {
    // 成功返回 code=200,并返回成功信息
    ctx.body = {
      code: 200,
      message: '注册成功'
    }
  }).catch(error => {
    // 失败返回 code=500 ，并返回错误信息
    console.log(error)
    // 如果返回的失败码是11000 则是用户名重复了，返回
    if (error.code === 11000) {
      console.log(error.code)
      ctx.body = {
        code: 1000,
        message: '用户名重复'
      }
    } else {
      console.log(error.errmsg)
      ctx.body = {
        code: 500,
        message: error
      }
    }
  })
})

router.post('/login', async (ctx) => {
  let loginUser = ctx.request.body
  console.log(loginUser)
  let userName = loginUser.username
  let password = loginUser.password
  // 引入User的model
  let User = mongoose.model('User')
  await User.findOne({username: userName}).exec()
    .then(async (result) => {
      console.log(result)
      if (result) {
        // console.log(User)
        // 当用户名存在时，开始验证密码
        let newUser = new User()
        await newUser.comparePassword(password, result.password)
          .then((isMatch) => {
            console.log(isMatch)
            // 返回对比结果
            if (isMatch) {
              ctx.body = { code: 200, message: '密码输入正确', passwordok: true }
            } else {
              ctx.body = { code: 200, message: '密码输入错误', passwordok: false }
            }
          })
          .catch(error => {
            console.log(error)
            ctx.body = {code: 500, message: error}
          })
      } else {
        console.log('用户不存在')
        ctx.body = {code: 200, message: '用户不存在', usernameok: false}
      }
    }).catch(error => {
      console.log(error)
      ctx.body = { code: 500, message: error }
    })
})

module.exports = router
