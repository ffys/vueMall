const fs = require('fs')

fs.readFile('data_json/goods.json', 'utf-8', function (err, data) {
  // 文件读取失败 输出错误信息
  if (err) {
    console.log(err)
  } else {
    // 文件读取成功 对数据进行处理
    let newData = JSON.parse(data) // JSON.parse 将字符串转换成json对象   JSON.stringify 将对象、数组转换成字符串
    let pushData = []
    let i = 0
    newData.RECORDS.map(function (value, index) {
      if (value.IMAGE1 != null) {
        i++
        console.log(value.name)
        pushData.push(value)
      }
    })
    console.log(i)

    fs.writeFile('data_json/newGoods1.json', JSON.stringify(pushData), function (err) {
      if (err) {
        console.log('文件写入失败')
      } else {
        console.log('文件写入成功')
      }
    })
  }
})
