const BASEURL = ' https://www.easy-mock.com/mock/5b7068de47165d690c031ac8/vueMall/'
const LOCALURL = 'http://localhost:3000/'
const API = {
  getShoppingMallInfo: BASEURL + 'index',
  getGoodsInfo: BASEURL + 'getGoodsInfo',
  registerUser: LOCALURL + 'user/register', // 用户注册接口
  loginUser: LOCALURL + 'user/login'
}
module.exports = API
