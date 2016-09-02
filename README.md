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


## 学习资源

* [vuex](http://vuex.vuejs.org/zh-cn/tutorial.html)

