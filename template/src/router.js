import Router from 'vue-router'
import Vue from 'vue'

// 全局注册 vue-router 插件
Vue.use(Router)

// 让v-link被激活时自动添加的class为“active”
let router = new Router({
  linkActiveClass: 'active'
})

router.map({
  '/': {   // 首页
    component: require('./views/Index')
  },
  '/posts': {  // 文章
    component: require('./views/posts/Index'),
    subRoutes: {
      '/list/:cat': {  // 文章列表，基于cat栏目类别
        name: 'cat',
        component: require('./views/posts/List')
      },
      '/detail/:id': {  // 文章详情，基于文章id
        name: 'detail',
        component: require('./views/posts/Detail')
      }
    }
  },
  '/search': { // 搜索结果页. 假设该页是需要鉴权的
    name: 'search',
    component: require('./views/Search'),
    auth: true
  },
  '/404': {
    component: require('./views/404')
  }
})

// 路由404重定向. 避免/posts只显示个无意义视图
router.redirect({
  '/posts': '/',
  '*': '/404'
})

export default router
