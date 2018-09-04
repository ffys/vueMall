const mongoose = require('mongoose') // 引入mongoose
const Schema = mongoose.Schema // 声明Schema
let ObjectId = Schema.Types.ObjectId // 声明object类型
const bcrypt = require('bcrypt') // 引入加密工具bcrypt
const SALT_WORK_FACTOR = 10 // 定义加密计算强度 1-10 10最高

// 创建用户Schema 模型
const userSchema = new Schema({
  UserId: ObjectId,
  username: {unique: true, type: String},
  password: String,
  creatTime: {type: Date, default: Date.now()},
  lastLoginTime: {type: Date, default: Date.now()}
}, {
  collection: 'users'
})

userSchema.pre('save', function (next) {
  console.log(this)
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) {
      return next(err)
    }
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) {
        return next(err)
      }
      this.password = hash
      next()
    })
  })
})

userSchema.methods = {
  comparePassword: (_password, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (!err) resolve(isMatch)
        else reject(err)
      })
    })
  }
}

// 发布模型
mongoose.model('User', userSchema)
