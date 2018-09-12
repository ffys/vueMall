const BASEURL = ' https://www.easy-mock.com/mock/5b7068de47165d690c031ac8/vueMall/'
const LOCALURL = /* 'http://localhost:3000 '  */ 'http://68.168.142.248:3000/'
const API = {
  getShoppingMallInfo: BASEURL + 'index',
  getGoodsInfo: BASEURL + 'getGoodsInfo',
  registerUser: LOCALURL + 'user/register', // 用户注册接口
  loginUser: LOCALURL + 'user/login',
  getDatailGoodsInfo: LOCALURL + 'goods/getDatailGoodsInfo', // 获取商品详细信息接口
  getCategoryList: LOCALURL + 'goods/getCategoryList', // 获取商品大类接口
  getCategorySubList: LOCALURL + 'goods/getCategorySubList', // 获取商品小类接口
  getGoodsListByCategorySubId: LOCALURL + 'goods/getGoodsListByCategorySubId' // 根据商品小类ID，从数据库获取对应的商品

}
module.exports = API
