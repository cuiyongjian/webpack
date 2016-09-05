import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import { domain, fromNow } from './filters'
import store from 'store/store'

// 全局注册 vue-resource 插件
Vue.use(VueResource);
// 全局注册过滤器
Vue.filter('fromNow', fromNow);

// App注入store
App.store = store;

// router全局钩子进行身份验证; 路由切换前进行身份验证(还没做...)
// 切换路由时，可以让页面始终停靠到窗口顶端。
router.beforeEach(function () {
  window.scrollTo(0, 0)
})

router.start(App, 'body');


