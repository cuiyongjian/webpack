var express = require('express');
var router = express.Router();
var config = require('../config')
// var httpProxy = require('http-proxy')
// var proxy = httpProxy.createProxyServer();
var path = require('path')
var request = require('request')
var debug = require('debug')('backend:api');


/* API状态码约定

0   OK
1   后端API接口不可用
2   服务端找不到文件，或文件读取错误
3+  留给后端开发人员使用的错误代码

*/

function proxy (req, res) {
  var options = {
    url: 'http://10.125.40.4:7890/jsonrpc/account?api_key=no',
    method: 'POST',
    json: true,
    timeout: 6000,
    body: {
      jsonrpc: '2.0',
      id: 0,
      method: req.url.slice(1),
      params: req.body
    }
  }
  debug('发送给微服务的body：', options.body)
  request(options, function (err, response, body) {
    if (err) {
      res.json({
        status: 1,
        msg: '后端接口不可用,' + err.message,
        data: null
      })
      return
    }
    if (response.statusCode !== 200 || body == null) {
      res.json({
        status: 2,
        msg: '后端接口错误,' + response.statusCode,
        data: null
      })
      return
    }
    res.json(body.result)
  })
}

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

/* contextPath/api 路径的所有请求转发给真正的后端服务 */
router.all('*', function (req, res) {
  // 请将target参数设置成 你的真正的后端api服务地址。如果后端服务不需要或跟前端不同的contextPath路径，你也可以去掉哦~
  // 例如设置为 proxy_target: 'http://otherServer:port/'+ contextPath +'/api/'
  // 那么，http://thisServer:port/pathABC/api/posts 的请求会转发到  http://otherServer:port/pathABC/api/posts
  proxy(req, res)
});




module.exports = router;
