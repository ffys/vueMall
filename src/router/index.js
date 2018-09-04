import Vue from 'vue'
import Router from 'vue-router'
import shoppingMall from '@/components/pages/shoppingMall'
import register from '@/components/pages/register'
import login from '@/components/pages/login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'shoppingMall',
      component: shoppingMall
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
    }
  ]
})
