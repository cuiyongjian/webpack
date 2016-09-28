import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import { domain, fromNow } from './filters'
import store from 'store/store'

// 全局注册 vue-resource 插件
Vue.use(VueResource);
Vue.http.options.root = '/account'; // 根据后端api实际情况修改ajax请求的前缀。
// http全局钩子
Vue.http.interceptors.push((request, next) => {
  next((response)=>{

  })
})

// 全局注册过滤器
Vue.filter('fromNow', fromNow);
// 全局注册组件
// Vue.component('ui-tree', require('components/UITree'))

// App注入store
App.store = store;

// router全局钩子进行身份验证; 路由切换前进行身份验证(还没做...)
// 切换路由时，可以让页面始终停靠到窗口顶端。
router.beforeEach(function () {
  window.scrollTo(0, 0)
})

router.start(App, 'body');


