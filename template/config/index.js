// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

// 上下文路径
var contextPath = '/account'
// 应用根目录，即：应用前端编译在什么目录
var distRoot = path.join('../backend/public', contextPath)

/*
 & 请将下面的转发配置为你实际的后端地址 &

1. 为了解决跨域问题，本地的express服务器会把/account/api的请求转给backend。从而在本地与后端进行联调。
2. 也可以不转给backend，而是转给mock的数据，这样前端server就会劫持mock请求，并返回mock目录下的数据。

比如你npm run dev, webpack利用express把前端托管在8008端口，
然后前端ajax也直接请求本地的8008端口,
express里的proxy中间件会将/account/api的请求透传给proxyTable配置的localhost:3000
这样，你将本地的backend启动，那么backend收到请求就可以进行实际的业务逻辑处理，或者api转发了。

另外，我们在express里面实现了一个mock路由，对/mock/的请求进行劫持。
从而在后端还未开发完成的时候，让前端开发人员可以在本地使用json来模拟数据。
所以，假如你的/api/这个后端服务还未开发完成，则你可以将/api/这个proxyTable配置为'http://localhost:8080/mock'
接下来，你就可以在项目的mock目录下，按照请求url的目录结构来创建json文件。最终，/api/test/a 这样的请求就会返回 /mock/test/a.json这个json数据。
这样可以保证上线时，前端代码无须做任何修改，因为你ajax请求的目标url本来就是按照与后端的接口协议进行书写的。
*/

var proxyTable = {
  '/account/api/': {
    target: 'http://localhost:3000',
    changeOrigin: true
  }
}

module.exports = {
  build: {
    env: require('./prod.env'),
    // 应用的根html物理路径(编译index.html的目标地址)
    index: path.resolve(__dirname, distRoot, 'index.html'),
    // 上线的config.js配置文件目标地址。里面存放了backend需要用到的应用路径
    config: path.resolve(__dirname, '../backend/config.json'),
    // 应用的根物理路径(编译目标地址)
    assetsRoot: path.resolve(__dirname, distRoot),
    // 访问应用的资源文件的相对路径
    assetsSubDirectory: 'static',
    // url中访问该应用的path根路径
    assetsPublicPath: contextPath,
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    assetsSubDirectory: 'static',
    assetsPublicPath: contextPath,
    proxyTable: proxyTable,
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
