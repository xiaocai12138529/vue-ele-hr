// 注册全局组件
// import PageTool from './plugin'
import myPageTool from './plugin'
Vue.use(myPageTool)
import Vue from 'vue'
import Cookies from 'js-cookie'
// css样式重置
import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
// element国际化
// import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖
//
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

// console.log()
(function() {
  let i = 1
  const log = console.log
  console.log = function() {
    // debugger
    log.apply(this, [i++, Date.now(), ...arguments])
  }
}
)()
// main.js引用 滚动条
import VueScroll from 'vuescroll'
Vue.use(VueScroll, {
  ops: {
    vuescroll: {},
    scrollPanel: {},
    rail: {
      keepShow: true
    },
    bar: {
      hoverStyle: true,
      onlyShowBarOnScroll: false, // 是否只有滚动的时候才显示滚动条
      background: '#ccc'
    }
  }, // 在这里设置全局默认配置
  name: 'myScroll' // 在这里自定义组件名字，默认是vueScroll
})

// element组件库
Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
  // locale: enLang // 如果使用中文，无需设置，请删除
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
