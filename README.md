# vue-webpack的样板文件
一个前后端分离的Vue开发脚手架。增加了backend目录作为node中间层部署在服务器端

## Feature
* 全功能的webpack配置。包含自动热加载(hot-reload), 自动代码检查(lint-on-save), 单元测试(unit testing), 以及css抽取打包(css extraction)

* 基于官方webpack脚手架模板。对其进行了适当增强修改。例如：默认使用pug(原jade)模板引擎，默认使用stylus的css预编译器，默认增加了对vue-router, vue-resource, vuex等vue插件的默认支持和依赖。

* 默认添加了少量有用的directive和filter (不需要可自行删除对应的目录)

* 添加了几个Hello World的blog页面，更完整的展示vue的使用方法

* 分离了路由视图与vue组件目录，更易于细粒度的区分页面和控件。


## 目录结构
```
|-backend: 后端目录
  |-bin: node http服务启动文件
  |-lib: 类库和中间件目录
  |-public: 静态资源目录
  |-routes: 路由处理函数
    |-api.js: api请求的处理，主要进行转发
    |-account.js: 上下文路径请求的处理
    |-index.js: 直接请求域名根路径的处理
  |-views: express的视图
  |-.gitignore: git忽略文件
  |-app.js: express入口
  |-config.json: 本项目的路径上下文的配置
  |-package.json: 本项目包配置

|-build: webpack配置和本地开发server的配置目录
  |-build.js: 编译配置
  |-dev-server.js： 本地server配置
  |-webpack.base.conf.js: webpack基础配置
  |-webpack.dev.conf.js: webpack开发环境的特殊配置，被base引用
  |-webpack.prod.conf.js: 生产环境配置，被base引用

|-config: 用于开发人员进行该写的配置目录
  |-index.js: 前端server和build的一些配置，如应用启动上下文路径，资源输出目录名等
  
|-mock： 模拟ajax数据的目录

|-node_modules: Node前端依赖包目录，如webpack各种插件

|-src： 前端源码
  |-assets：前端资源目录，被webpack依赖。如data放置前端静态json，img放置图片，stylus放置公共stylus函数、变量，lib放置公共js函数库、css放置公共css如normalize.css等
  |-components: 针对本网站业务开发的不太通用的vue组件/UI控件（通用的可以做成npm包被node管理）
  |-filters： 过滤器
  |-views：也是vue组件，不过逻辑上当做路由的视图来用
  |-vuex：状态管理
  |-App.vue: vue页面根组件
  |-main.js: vue单页应用的入口
  |-router.js: vue的全局路由配置

|-static： 前端纯静态资源

|-test: 测试代码目录

|-.babelrc: babel配置文件

|-.editorconfig: 编辑器配置文件

|-.selintignore: eslint忽略配置

|-.eslintrc.js: eslint配置文件

|-.gitignore: git忽略文件

|-index.html:  前端入口

|-package.json: node包配置

|-README.md: 说明
```

## 本脚手架用法

本模板的创建需通过[vue-cli](https://github.com/vuejs/vue-cli)进行。故需安装node、vue-cli、npm
建议使用npm 3+的版本.
node建议4.x.

``` bash
$ npm install -g vue-cli  // 安装vue-cli命令行工具
$ vue init cuiyongjian/webpack my-project-name  // 下载脚手架并初始化项目
$ cd my-project-name  // 进入项目目录
$ npm install  // 安装依赖
$ npm run dev  // 启动前端本地调试服务器
$ cd backend && npm run dev //启动本地后端backend服务器
```

### 流程说明：

1. 先初始化脚手架
1. 然后进入项目目录，安装依赖。
1. 此时，你需要思考一下你即将要开发的应用是在一个域名根目录下应用(如http://ip:port/index.html)，还是在域名某个子路径下的应用(如http://ip:port/account/index.html)。
1. 如果你是域名根下的应用(也就是访问http://yourdomain/直接就是你的应用根路由)，那么，就要配置config/index.js中的contextPath为'/';  若你开发的是域名子路径下的应用，例如公司安排你开发一个独立的account应用，最终部署后也希望是通过http://yourdomain/account/来访问你的这个独立应用，那么，就配置contextPath为'/account'；（实际上，该配置是为了生成准确的静态资源link或src的链接）
1. 接下来，是给vue-resource这个插件配置全局的请求前缀。比如，配置src/main.js中的vue.http.options.root为'/account'。当然，这不是必须的，这取决于你ajax请求有没有统一前缀。
1. 下一步是：规划页面路由。要进行应用开发，第一步就是规划你的页面，进而规划出路由。 路由系统中设置的'/', '/posts'等路由，最终都将表现为 http://ip:port/contextPath/!#/route这样的格式。 也就是说，所有路由的"根"默认就是从你的contextPath开始的.
1. 前后端并行开发时，若后端还没开发完毕，那么，前端可以先在本地mock做数据模拟. 在本脚手架中，这很简单，默认你本地执行npm run dev后会跑在localhost:8080，此时，只需要在config/index.js中配置proxyTable, 就可以将你本地前端localhost:8080的ajax的请求转发给本地http://localhost:8080/mock/。这样的话，你页面中的ajax请求路径最终都会映射为mock目录下的文件。举例来说：http://localhost:8080/account/api/posts这个ajax请求，会转发为http://localhost:8080/mock/account/api/posts, 而最终映射到的文件是：mock/account/api/posts.json.
1. 假如后端已经开发完毕，那么也可以通过config/index.js里面的proxyTable将你的本地ajax请求，转发给本地的backend或者线上的backend，实现本地开发阶段的前后端联调。
1. 如上都配置完毕，就可以开发页面了； npm run dev启动前端开发服务器进行开发预览，保存代码后可以自动刷新浏览器，启动的前端开发服务器地址默认是 http://localhost:8080.  你可以指定PORT=9999 npm run dev这样来通过环境变量来修改默认端口。
1. npm run lint -s可以进行代码规范检查（-s是为了让npm报错）

### 编译和部署流程

``` bash
$ npm run build // 本地，在根代码目录下执行编译。 会有一个config.json文件生成到backend，不要删掉他哦。
$ npm publish  // 发布backend到npm仓库（这不是必须的）
$ npm install your-project-name  // 在服务器上，下载你的应用
$ cd your-project-name //进入你的应用
$ npm install // 进入服务器上的backend目录，在里面执行安装依赖
$ NODE_ENV=production npm start  // 服务器上启动backend (真正上线时，需使用pm2将node作为daemon进程启动)
```

1. 编译就是将前端代码打包压缩，放入到backend目录下的public目录中。backend这个中间层是一个node服务端，最终需要部署到服务器。它也是基于你前面配置的contextPath路径来托管前端代码。
1. 编译，执行npm run build将前端代码编译到backend/public目录下。
1. 现在，backend目录就是即将要部署的前端node层代码(里面public目录下也包含了所有的前端上线代码)。只需要将backend提交到代码服务器，或者发布到npm仓库，或者其他任何方式发布到生产服务器即可。
1. backend发布到生产服务器之后，在服务器上该目录下执行npm install安装backend的依赖。
1. backend作为中间层需要将api请求转发给真正的后端服务。所以此时，应去配置backend/routes/api.js里面的转发目标地址，配成真正的后端服务地址。
1. 至此，backend中间层就做了两件事：第一、使用express.static中间件托管前端资源。第二、将api请求转发给后端服务。 如果你需要中间层要做其他的一些服务，那么直接在express里面添加对应路由的代码即可。
1. 去服务器的backend目录，安装依赖，然后直接执行npm start启动backend服务。或用强大的pm2等工具将backend作为后台进程启动起来。
1. 此时，backend就会启动在3000端口，当你访问http://ip:port/contextPath即可返回前端应用。访问http://ip:port/contextPath/api/xxx就会将请求转发给后端对应接口。 转发代码在backend/route/api.js里，如需自自定义转发规则可直接修改。



## 啰嗦一下：脚手架包含哪些内容？

- 默认添加了vue-router和vue-resource.  vue-router提供页面路由，vue-resource用来支持ajax请求

- 默认可选支持'stylus'和'pug(jade)'模板引擎，更高的开发效率

- `npm run dev`: 首创的开发体验.
  - Webpack + `vue-loader` 可以让你在单个文件内开发vue组件(扩展名为.vue).
  - 保留页面状态的热加载。 保存代码，页面自动更新，这还不够，我们的热加载可以保留页面状态，让你不需要重新用鼠标点到当前正在调试的位置。而之前组件的数据和状态都将保留，刷新的仅仅是组件模板和样式。(当然，这也会导致你更改了model数据，界面上不会有变化)
  - State preserving compilation error overlay (不懂...)
  - 代码保存立刻eslint进行检查
  - 生成Source Maps

- `npm run build`: 为生产环境而编译.
  - 基于 [UglifyJS](https://github.com/mishoo/UglifyJS2)的JavaScript压缩
  - 基于 [html-minifier](https://github.com/kangax/html-minifier)的html压缩.
  - 从各个组件中抽取css并合并到一个文件，最后压缩，基于[cssnano](https://github.com/ben-eb/cssnano).
  - 所有静态资源编译后自带版本hash，从而可以提供更高效的缓存. index.html里自动生成正确的引用路径Url.

- `npm run unit`: 基于 [Karma](http://karma-runner.github.io/0.1.3/index.html) + [Mocha](http://mochajs.org/) + [karma-webpack](https://github.com/webpack/karma-webpack) 在PhantomJS里面进行单元测试.
  - 测试文件编写支持ES6(ES201.5).
  - 支持所有的webpack loaders.
  - 简单的mock模拟数据注入.

- `npm run e2e`: 基于 [Nightwatch](http://nightwatchjs.org/)进行End-to-End测试.
  - 并行的在多个浏览器进行测试.
  - Works with one command out of the box:
    - Selenium and chromedriver dependencies automatically handled.
    - Automatically spawns the Selenium server.

- 使用eslint进行代码规范检查，推荐您开启eslint。为您的团队开启规范编码之旅

## 小技巧和说明
* 使用.editorconfig对编辑器进行配置，可以自动化的为您提供编辑器级别的代码规范设置。例如可以设置默认tab键缩进2个空格，满足JavaScript编码规范要求。

* views源码目录下存放路由相关视图。 components目录下存放控件(组件)。 组件中css样式可添加scoped避免对页面布局造成影响。 不写scoped的样式最终都会打包在app.css里面，所以请学习css优先级方面的知识来避免css样式覆盖和混乱。

* 每个vue文件中，顶级代码空2格缩进开始写，因为\<template\>等标签已经顶格写了。

* 由于webpack.base.conf.js里面配置了一些alias别名，故在vue的模板和样式中你可以使用~aliasnName/xxx来简化引用模块的路径。在js中可以使用'alias/xxx'代表简化引用js模块。


* App.vue内放置全站要共享的页面部分，但是鉴于全站太复杂（比如搜索页和404页都不需要这些共享部分），所以本demo里App.vue里并没有放置，而是把header和footer抽离成partial，供首页和文章列表/详情页自己调用。

* 本实例中，views里面这些页面的样式是这样写的： App.vue里面写一些全局的公共的样式，包含了footer和header部分的样式（因为写在首页和文章页是共享他们的，写在哪都不合适）。 然后首页自己的样式就写在首页里面，文章页的就写在文章页里面。 （views视图页面样式并没有使用scoped，UI控件的样式使用scoped）
要注意页面views这些视图样式最终都会合并起来，所以请注意css优先级（脑补一下最终合并的样子）

* 单文件组件是靠webpack和vue-loader实现的，所以可以通过学习vue-loader来了解在本脚手架中书写vue.js组件的技巧


## 学习资源


* [vue官方文档](http://vuejs.org.cn/)
* [官方脚手架的webpack配置说明](http://vuejs-templates.github.io/webpack/index.html)
* [vuex](http://vuex.vuejs.org/zh-cn/tutorial.html)
* [vue-loader](http://vue-loader.vuejs.org/)
* [webpack教程](http://webpack.toobug.net/zh-cn/)
* [ES6语法](http://es6.ruanyifeng.com/)
* [Standard JavaScript Style Guide Rules](https://github.com/feross/standard/blob/master/RULES.md)
* [Airbnb JavaScript Style Guide 中文版](https://github.com/yuche/javascript)

## 其它脚手架参考
[https://github.com/libertyAlone/vue-myTemplate](https://github.com/libertyAlone/vue-myTemplate)
[简易留言板](https://github.com/kenberkeley/vue-demo#features)

