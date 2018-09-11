const Koa = require('koa')
const app = new Koa()
// const mongoose = require('mongoose')
const {connect, initSchema} = require('./database/init.js') // 引入连接数据库处理js
const Router = require('koa-router') // 路由
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors') // 让koa2支持跨域的中间件

app.use(bodyParser())
app.use(cors())

let user = require('./api/User')
let goods = require('./api/Goods')

// 装载所有子路由
let router = new Router()
router.use('/user', user.routes())
router.use('/goods', goods.routes())

// 加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

// egg.js 更完美

// 立即连接数据库
;(async () => {
  await connect()
  initSchema()
})()
app.use(async (ctx) => {
  ctx.body = '<h1>vueMall demo</h1>'
})

app.listen(3000, () => {
  console.log('[Server] starting at port 3000')
})
