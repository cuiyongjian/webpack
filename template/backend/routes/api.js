var express = require('express');
var router = express.Router();
var config = require('../config')
var httpProxy = require('http-proxy')
var proxy = httpProxy.createProxyServer();

/* API状态码约定

0   OK
1   后端API接口不可用
2+  留给后端开发人员使用的错误代码

*/



/* API中间层介绍 */
router.get('/', function(req, res, next) {
  res.json({
    status: 0,
    msg: 'OK',
    data: [
      "使用方法：直接发起针对" + config.contextPath + '/api/xxx的请求',
      "node层会将此类API请求转发给实际的后端处理程序，并返回给您后端的结果"
    ]
  });
});

/* contextPath/api 路径的所有请求转发给后端 */
router.all('*', function (req, res) {
  // 例如 http://thisServer:port/pathABC/api/posts 会转发到  http://otherServer:port/pathABC/api/posts
  proxy.web(req, res, {target: 'http://otherServer:8080/' + config.contextPath + '/api/'});
  proxy.on('error', function (e) {
    res.json({
      status: 1,
      msg: '后端接口不可用',
      data: null
    })
  });
});




module.exports = router;
