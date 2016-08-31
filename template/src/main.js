import Vue from 'vue'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import App from './App'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import router from './router'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import VueResource from 'vue-resource'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

// 全局注册 vue-resource 插件
Vue.use(VueResource){{#if_eq lintConfig "airbnb"}};{{/if_eq}}

// 启动路由(这是整个application的入口)
router.start(App, 'body'){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
