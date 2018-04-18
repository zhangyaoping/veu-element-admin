import Vue from 'vue'
// 引入babel编译环境
import 'babel-polyfill'
import 'normalize.css/normalize.css'// css重置。

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // 全局的css

import App from './App'
import router from './router'
import store from './store'
import Api from '@/Api'
import './icons' // 图标
import './permission' // 权限控制
import './mock' // 模拟数据

import * as filters from './filters' // 全局过滤器

Vue.use(Element, {
  size: 'small' // 设置element-ui默认大小medium
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
Vue.prototype.Api = Api.testApi // Vue全局使用Api
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
