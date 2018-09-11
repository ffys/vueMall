import Vue from 'vue'
import Router from 'vue-router'
import shoppingMall from '@/components/pages/shoppingMall'
import register from '@/components/pages/register'
import login from '@/components/pages/login'
import Goods from '@/components/pages/goods'
import CategoryList from '@/components/pages/categoryList'
import Main from '@/components/pages/main'
import cart from '@/components/pages/cart'
import user from '@/components/pages/user'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/',
          name: 'shoppingMall',
          component: shoppingMall
        },
        {
          path: '/categoryList',
          name: 'categoryList',
          component: CategoryList
        }, {
          path: '/user',
          name: 'user',
          component: user
        }
      ]
    },

    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/goods',
      name: 'goods',
      component: Goods
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart

    }
  ]
})
