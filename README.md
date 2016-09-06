# vue-webpack的样板文件

* 一个全功能的完全前后端分离的Vue开发脚手架。增加了backend目录，它作为前端的服务端node中间层部署在服务器端。 部署流程见下文。

* 全功能webpack配置。包含自动热加载(hot-reload), 自动代码检查(lint-on-save), 单元测试(unit testing), 以及css抽取打包(css extraction)

* 对vue官方的webpack脚手架模板进行了增强，默认使用pug(jade)模板引擎，默认使用stylus的css预编译器，默认增加了对vue-router, vue-resource, vuex等vue插件的默认支持。

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

下载脚手架并进行开发的流程：

1. 先初始化脚手架
1. 然后进入项目目录，安装依赖。
1. 此时，你需要思考一下你即将要开发的应用是在一个域名根目录下应用(如http://ip:port/index.html)，还是在域名某个子路径下的应用(如http://ip:port/account/index.html)。
1. 如果你是域名根下的应用(也就是访问http://yourdomain/直接就是你的应用根路由)，那么，就要配置config/index.js中的contextPath为'/';  若你开发的是域名子路径下的应用，例如公司安排你开发一个独立的account应用，最终部署后也希望是通过http://yourdomain/account/来访问你的这个独立应用，那么，就配置contextPath为'/account'；
1. 这一步，是给vue-resource这个插件配置请求前缀。比如，配置src/main.js中的vue.http.options.root为'/account'。当然，这不是必须的。如果你全站的ajax都基于同样的前缀，那么，在这里配置好前缀会更方便一点，若你的应用不同页面ajax目标不同，则此处留空，在各个页面单独写ajax目标更好一点。
1. 这一步是：规划页面路由。要进行应用开发，第一步就是规划你的页面，进而规划出路由。 路由系统中设置的'/', '/posts'等路由，最终都将表现为 http://ip:port/contextPath/!#/route这样的格式。 也就是说，所有路由的"根"默认就是从你的contextPath开始的.
1. 前后端并行开发时，若后端还没开发完毕，那么，前端可以先在本地mock做数据模拟. 在本脚手架中，这很简单，默认你本地执行npm run dev后会跑在localhost:8080，此时，只需要在config/index.js中配置proxyTable, 就可以将你本地前端localhost:8080的ajax的请求转发给本地http://localhost:8080/mock/。这样的话，你页面中的ajax请求路径最终都会映射为mock目录下的文件。举例来说：http://localhost:8080/account/api/posts这个ajax请求，会转发为http://localhost:8080/mock/account/api/posts, 而最终映射到的文件是：mock/account/api/posts.json.
1. 假如后端已经开发完毕，那么也可以通过config/index.js里面的proxyTable将你的本地ajax请求，转发给后端真实的api接口，实现本地开发阶段的前后端联调。
1. 如上都配置完毕，就可以开发页面了； npm run dev启动前端开发服务器进行开发预览，保存代码后可以自动刷新浏览器，启动的前端开发服务器地址默认是 http://localhost:8080.  你可以PORT=9999 npm run dev这样来通过环境变量来修改默认端口。
1. npm run lint 可以进行代码规范检查

本过程的命令提示：

``` bash
$ npm install -g vue-cli  // 安装vue-cli命令行工具
$ vue init cuiyongjian/webpack my-project-name  // 下载脚手架并初始化项目
$ cd my-project-name  // 进入项目目录
$ npm install  // 安装依赖
$ npm run dev  // 启动前端本地调试服务器
```

编译和部署流程

1. 编译就是将前端代码打包压缩，放入到backend目录下的public目录中。backend这个中间层是一个node服务端，最终需要部署到服务器。它也是基于你前面配置的contextPath路径来托管前端代码。
1. 编译，执行npm run build将前端代码编译到backend/public目录下。
1. 现在，backend目录就是即将要部署的前端node层代码(里面public目录下也包含了所有的前端上线代码)。只需要将backend提交到代码服务器，或者发布到npm仓库，或者其他任何方式发布到生产服务器即可。
1. backend发布到生产服务器之后，在服务器上该目录下执行npm install安装backend的依赖。
1. backend作为中间层需要将api请求转发给真正的后端服务。所以此时，应去配置backend/routes/api.js里面的转发目标地址，配成真正的后端服务地址。
1. 至此，backend中间层就做了两件事：第一、使用express.static中间件托管前端资源。第二、将api请求转发给后端服务。 如果你需要中间层要做其他的一些服务，那么直接在express里面添加对应路由的代码即可。
1. 去服务器的backend目录，安装依赖，然后直接执行npm start启动backend服务。或用强大的pm2等工具将backend作为后台进程启动起来。
1. 此时，backend就会启动在3000端口，当你访问http://ip:port/contextPath即可返回前端应用。访问http://ip:port/contextPath/api/xxx就会将请求转发给后端对应接口。 转发代码在backend/route/api.js里，如需自自定义转发规则可直接修改。

下面是命令提示：
``` bash
$ npm run build // 本地，在根代码目录下执行编译。 会有一个config.json文件生成到backend，不要删掉他哦。
$ npm publish  // 发布backend到npm仓库
$ npm install your-project-name  // 在服务器上，下载你的应用
$ cd your-project-name //进入你的应用
$ npm install // 进入服务器上的backend目录，在里面执行安装依赖
$ npm start  // 服务器上启动backend (真正上线时，需使用pm2将node作为daemon进程启动)
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
* [Airbnb JavaScript Style Guide 中文版](https://github.com/yuche/javascript)

