import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: resolve => require(['@/components/Hello'],resolve),
      meta: { keepAlive: false, title:'首页' }
    },
    {
      path: '/siteNav',
      name: 'siteNav',
      component: resolve => require(['@/views/siteNav'],resolve),
      meta: { keepAlive: false }
    },
    {
      path: '/404',
      name: '404',
      component: resolve => require(['@/views/404'],resolve),
      meta: { keepAlive: false }
    },
    {
      path: '/feedBack',
      name: 'feedBack',
      component: resolve => require(['@/views/feedBack'],resolve),
      meta: { keepAlive: false, title:'意见反馈' }
    },
    {
      path: '/feedBackList',
      name: 'feedBackList',
      component: resolve => require(['@/views/feedBackList'],resolve),
      meta: { keepAlive: false, title:'我的反馈' }
    }
  ]
})
