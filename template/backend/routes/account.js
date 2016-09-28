var express = require('express');
var router = express.Router();
var path = require('path')
var debug = require('debug')('backend:routes');

router.get('/logout', function (req, res, next) {
  // 登出
  res.json({
    status: 0,
    msg: 'node层会话退出成功',
    data: passportLogoutUrl
  })
})

module.exports = router;
