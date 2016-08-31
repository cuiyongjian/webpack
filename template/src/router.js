import Router from 'vue-router'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import Vue from 'vue'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

// 全局注册 vue-router 插件
Vue.use(Router){{#if_eq lintConfig "airbnb"}};{{/if_eq}}

// 让v-link被激活时自动添加的class为“active”
let router = new Router({
  linkActiveClass: 'active'{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}

// 路由配置
router.map({
  '/': {
    component: require('./components/Home')
  },
  '/posts': {
    component: require('./components/posts/View'),
    subRoute: {
      '/:id': {
        component: require('./components/posts/Detail')
      }
    }
  },
  '/categorys': {
    component: require('./components/posts/View'),
    subRoute: {
      '/': {
        component: require('./components/categorys/List')
      },
      '/:name': {
        component: require('./components/categorys/Detail')
      }
    }
  }
});



/*
// 路由重定向. 例如：若你的文章列表路由是'/posts/list'，而/posts路由只做视图的话。
// 这种情况，则需将'/posts'重定向到子路由'/posts/list'

router.redirect({
  '/posts': '/posts/list'
})
*/

export default router;