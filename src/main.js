// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import FastClick from 'fastclick'
import App from './App'
import {LoadingPlugin,ToastPlugin,AlertPlugin,ConfirmPlugin } from 'vux'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './assets/style/common.css'
import './assets/style/theme.css'
import Global_ from './components/Global' //全局变量
import Base from './base' //全局函数
import title from './directive/directive' //全局指令
import Icon from 'vue-awesome/components/Icon' //图标库，图标需要在组件内单独模块化引入

//调试工具
/*import eruda from 'eruda'
 eruda.init();*/

//挂载全局变量
Vue.prototype.GLOBAL = Global_

//注册组件
Vue.use(Vuex)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(VueAxios, axios)
Vue.component('icon', Icon)

const store = new Vuex.Store({})
store.registerModule('vux', {
  state: {
    isLoading: false,
    showBack: true,
    direction: 'forward',
    title: ''
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    updateShowBack (state, showBack) {
      state.showBack = showBack
    },
    updateTitle (state, title) {
      state.title = title
    },
    updateDirection (state, payload) {
      state.direction = payload.direction
    }
  }
})

const http = Vue.http
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)
  if (to.matched.length === 0) { //如果未匹配到路由
    next('/404');
  }
  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('updateDirection', {direction: 'forward'})
    } else {
      store.commit('updateDirection', {direction: 'reverse'})
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('updateDirection', {direction: 'forward'})
  }

  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }

})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
})

//阻止点击穿透，处理300毫秒延迟问题
FastClick.attach(document.body)

//阻止 vue 在启动时生成生产日志提示
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')
