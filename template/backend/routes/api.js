var express = require('express');
var router = express.Router();
var config = require('../config')
var httpProxy = require('http-proxy')
var proxy = httpProxy.createProxyServer();

/* API状态码约定

0   OK
1   后端API接口不可用
2   服务端找不到文件，或文件读取错误
3+  留给后端开发人员使用的错误代码

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

/* contextPath/api 路径的所有请求转发给真正的后端服务 */
router.all('*', function (req, res) {
  console.log('来了')
  // 请将target参数设置成 你的真正的后端api服务地址。如果后端服务不需要contextPath路径，你也可以去掉哦~
  // 例如设置为 target: 'http://otherServer:port/'+ contextPath +'/api/'
  // 那么，http://thisServer:port/pathABC/api/posts 的请求会转发到  http://otherServer:port/pathABC/api/posts
  proxy.web(req, res, {target: 'http://localhost:8080/account'+config.contextPath+'/api/'});
  proxy.on('error', function (e) {
    res.json({
      status: 1,
      msg: '后端接口不可用',
      data: null
    })
  });
});




module.exports = router;
