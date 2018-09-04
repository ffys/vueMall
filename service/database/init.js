const mongoose = require('mongoose')
const db = 'mongodb://vuemall:vuemall@68.168.142.248:27017/vuemall' // mongodb://用户：密码@IP地址：端口号/要连接的数据库
const glob = require('glob')
const {resolve} = require('path')

// 载入所有Schema 的函数
exports.initSchema = () => {
  glob.sync(resolve(__dirname, './schema/', '**/*.js')).forEach(require)
}

// 连接数据库
exports.connect = () => {
  mongoose.connect(db)

  let maxConnectTimes = 0
  return new Promise((resolve, reject) => {
    // 把所有连接处理放这里

    // 添加数据库监听事件
    mongoose.connection.on('disconnected', () => {
      console.log('***********数据库断开***********')
      if (maxConnectTimes < 3) {
        maxConnectTimes++
        mongoose.connect(db)
      } else {
        reject(new Error('数据库出现问题'))
        // reject()
        throw new Error('数据库出现问题，程序无法连接数据库')
      }
    })

    mongoose.connection.on('error', err => {
      console.log('***********数据库错误***********')
      if (maxConnectTimes < 3) {
        maxConnectTimes++
        mongoose.connect(db)
      } else {
        reject(err)
        throw new Error('数据库出现问题，程序无法连接数据库')
      }
    })

    // 数据库连接成功时
    mongoose.connection.once('open', () => {
      console.log('MongoDB connected successfully')
      resolve()
    })
  })
}
