# vue-webpack的样板文件

* 一个全功能的webpack配置，包含自动热加载(hot-reload), 自动代码检查(lint-on-save), 单元测试(unit testing), 以及css抽取打包(css extraction)

* 对vue官方的webpack脚手架模板进行了增强。 增加了对pug(jade), stylus的可选支持; 增加了对vue-router, vue-resource, vuex等vue插件的默认支持

* 默认添加了少量有用的directive和filter (不需要可自行删除)

* 添加了符合vuex使用规范的示例代码

* 分离了路由视图与vue组件目录，更易于细粒度的区分页面和控件。我们认为views目录下应该放置路由切换的页面视图，components目录下应该放置所谓的UI控件。尽管实际上，他们是同一个东西。

* src/assets目录下是被webpack管理的资源文件，我们增加了css, img, js目录对代码进行区分，这在大型项目中应该是必要的。

* 优化了默认Hello World代码，使其更容易帮助新人理解router等插件的使用

## webpack进行vue开发的使用文档

关于vuejs里面官方使用webpack的详细文档可参考 [docs](http://vuejs-templates.github.io/webpack). 
建议读一下. (因为本脚手架也是基于该模板进行优化而已)

## 本脚手架用法

这是一个基于webpack打包工具的vuejs开发脚手架模板。 本模板需通过[vue-cli](https://github.com/vuejs/vue-cli)进行调用。
vue-cli建议使用npm 3+的版本.
node建议4.x.

创建本项目脚手架的命令：

``` bash
$ npm install -g vue-cli
$ vue init cuiyongjian/webpack my-project-name
$ cd my-project-name
$ npm install
$ npm run dev
```

## 脚手架包含哪些内容？

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

- `npm run unit`: 基于 [Karma](http://karma-runner.github.io/0.13/index.html) + [Mocha](http://mochajs.org/) + [karma-webpack](https://github.com/webpack/karma-webpack) 在PhantomJS里面进行单元测试.
  - 测试文件编写支持ES6(ES2015).
  - 支持所有的webpack loaders.
  - 简单的mock模拟数据注入.

- `npm run e2e`: 基于 [Nightwatch](http://nightwatchjs.org/)进行End-to-End测试.
  - 并行的在多个浏览器进行测试.
  - Works with one command out of the box:
    - Selenium and chromedriver dependencies automatically handled.
    - Automatically spawns the Selenium server.

- 使用eslint进行代码规范检查，推荐您开启eslint。为您的团队开启规范编码之旅

## 小技巧
* 使用.editorconfig对编辑器进行配置，可以自动化的为您提供编辑器级别的代码规范设置。例如可以设置默认tab键缩进2个空格，满足JavaScript编码规范要求。

* views源码目录下存放路由相关视图。 components目录下存放控件(组件)。 组件中css样式可添加scoped避免对页面布局造成影响。 不写scoped的样式最终都会打包在app.css里面，所以请学习css优先级方面的知识来避免css样式覆盖和混乱。

* 每个vue文件中，顶级代码空2格缩进开始写，因为<template>等标签已经顶格写了。

* 由于webpack.base.conf.js里面配置了一些alias别名，故在vue的模板和样式中你可以使用~aliasnName/xxx来代表某个目录。在js中可以使用'alias/xxx'代表某个别名目录。

* 我们在express里面实现了一个mock路由，对/mock/的请求进行劫持。
从而在后端还未开发完成的时候，让前端开发人员可以在本地使用json来模拟数据。
所以，假如你的/api/这个后端服务还未开发完成，则你可以将/api/这个proxyTable配置为'http://localhost:8080/mock'
接下来，你就可以在项目的mock目录下，按照请求url的目录结构来创建json文件。最终，/api/test/a 这样的请求就会返回 /mock/test/a.json这个json数据。 
这样可以保证上线时，前端代码无须做任何修改，因为你ajax请求的目标url本来就是按照与后端的接口协议进行书写的。

* App.vue内放置全站要共享的页面部分，但是鉴于全站太复杂（比如搜索页和404页都不需要这些共享部分），所以本demo里App.vue里并没有放置，而是把header和footer抽离成partial，供首页和文章列表/详情页自己调用。

* views里面这些页面的样式是这样写的： App.vue里面写一些全局的公共的样式，包含了footer和header部分的样式（因为写在首页和文章页是共享他们的，写在哪都不合适）。 然后首页自己的样式就写在首页里面，文章页的就写在文章页里面。 （views视图页面样式并没有使用scoped，UI控件的样式使用scoped）
要注意页面views这些视图样式最终都会合并起来，所以请注意css优先级（脑补一下最终合并的样子）


## 学习资源

* [vuex](http://vuex.vuejs.org/zh-cn/tutorial.html)

