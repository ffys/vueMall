const Router = require('koa-router') // 引入路由
const mongoose = require('mongoose') // 引入mongoose
const fs = require('fs')

let router = new Router()
router.get('/insertAllGoods', async (ctx) => {
  fs.readFile('./data_json/newGoods.json', 'utf-8', function (err, data) {
    if (err) {
      console.log(err)
    } else {
      let newdata = JSON.parse(data)
      let saveCount = 0
      const Goods = mongoose.model('Goods')
      newdata.map((value, index) => {
        let newGoods = new Goods(value)
        newGoods.save().then(() => {
          saveCount++
          console.log('成功' + saveCount)
        }).catch(error => {
          console.log('失败' + error)
        })
      })
    }
  })

  ctx.body = '开始插商品入数据'
})

router.get('/insertCategory', async (ctx) => {
  fs.readFile('./data_json/category.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err)
    } else {
      let newdata = JSON.parse(data)
      const Category = mongoose.model('Category')
      let saveCount = 0
      newdata.RECORDS.map((value, index) => {
        let newCategory = new Category(value)
        newCategory.save().then(() => {
          saveCount++
          console.log('成功' + saveCount)
        }).catch(error => {
          console.log('失败' + error)
        })
      })
    }
  })
  ctx.body = '开始导入商品大类数据'
})

router.get('/insertCategorySub', async (ctx) => {
  fs.readFile('./data_json/category_sub.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err)
    } else {
      let newdata = JSON.parse(data)
      let saveCount = 0
      const CategorySub = mongoose.model('categorySub')
      newdata.RECORDS.map((value, index) => {
        console.log(value)
        let newCategorySub = new CategorySub(value)
        newCategorySub.save().then(() => {
          saveCount++
          console.log('插入数据成功' + saveCount)
        }).catch((err) => {
          console.log('插入数据失败' + err)
        })
      })
    }
  })
  ctx.body = '开始导入商品子类数据'
})

// 根据前端传过来的商品ID，从数据库查询对应ID的商品信息给前端
router.post('/getDatailGoodsInfo', async (ctx) => {
  let goodsId = ctx.request.body.goodsId
  const Goods = mongoose.model('Goods')
  await Goods.findOne({ID: goodsId}).exec()
    .then(async (result) => {
      ctx.body = {code: 200, message: 'successful', data: result}
    }).catch(error => {
      console.log(error)
      ctx.body = {code: 500, message: error}
    })
})

// 查询商品大类，传递给前端
router.get('/getCategoryList', async (ctx) => {
  let Category = mongoose.model('Category')
  await Category.find().exec()
    .then(async (result) => {
      console.log(result)
      ctx.body = {code: 200, message: 'successful', data: result}
    }).catch(error => {
      console.log(error)
      ctx.body = {code: 500, message: error}
    })
})

// 根据前端传过来商品大类的ID，查询商品大类中的小类，传递给前端
router.post('/getCategorySubList', async (ctx) => {
  let categoryId = ctx.request.body.categoryId
  let CategorySub = mongoose.model('CategorySub')
  await CategorySub.find({MALL_CATEGORY_ID: categoryId}).exec()
    .then(async (result) => {
      console.log(result)
      ctx.body = {code: 200, message: 'successful', data: result}
    }).catch(error => {
      console.log(error)
      ctx.body = {code: 500, message: error}
    })
})

// 根据商品类别从数据库查询商品，传递给前端
router.post('/getGoodsListByCategorySubId', async (ctx) => {
  let categorySubId = ctx.request.body.categorySubId
  let num = 10 // 每页显示的数量
  let page = ctx.request.body.page // 第几页
  let start = (page - 1) * num
  // let categorySubId = '2c9f6c946016ea9b016016f79c8e0000'
  let Goods = mongoose.model('Goods')
  await Goods.find({SUB_ID: categorySubId}).skip(start).limit(num).exec()
    .then(async (result) => {
      console.log('第几页 ' + page)
      console.log(result)
      ctx.body = {code: 200, message: 'successful', data: result}
    }).catch(error => {
      console.log(error)
      ctx.body = {code: 500, message: error}
    })
})

module.exports = router
