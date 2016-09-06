var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('../config')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')


// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
});

// mock劫持. req.path拿到的是/mock/xxx后面的xxx
app.use('/mock', function (req, res, next) {
  var reqPath = req.path;
  var localPath = path.join(__dirname, '../mock', reqPath + '.json');
  var fs = require('fs');
  fs.readFile(localPath, function (err, data) {
    resData = {
      status: 2,
      msg: '',
      data: null
    };
    if (err) {
      resData.msg = err.message;
    }
    else {
      resData = JSON.parse(data);
    }
    // 若要setTimeout请谨慎：注意闭包，多个并发请求时，resData很容易变成最后一次请求的resData
    res.json(resData);
  });
});

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
// TODO: 这个会导致 baseURL 的url解析出错！！！ 暂时禁用
// app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))
app.use('/', function (req, res, next) {
  if (req.originalUrl === '/' && (config.contextPath !== '/')) {
    var str = '您config/index.js中的<span style="color:red;">contextPath</span>配置为：' + config.dev.assetsPublicPath + '</br></br></br>';
    res.send(str + '所以，您不能访问域名根路径，您需访问<a href="' + config.dev.assetsPublicPath + '"> http://'+ req.hostname + config.dev.assetsPublicPath+' </a>');
    return;
  }
  next();
});
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
