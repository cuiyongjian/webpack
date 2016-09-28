var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session')
var auth = require('./lib/auth')

var index = require('./routes/index');
var api = require('./routes/api');
var account = require('./routes/account');

var config = require('./config');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// app.set('trust proxy', 'loopback, linklocal, uniquelocal')
app.set('trust proxy', true)

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
  secret: 'budgetObs',
  resave: false,
  saveUninitialized: true
}))
// 鉴权. 若是非ajax请求，给返回302跳转，若是ajax请求，给返回ajax无权限错误json数据。
app.use(auth())

// 直接访问css扩展名，express会把stylus实时编译成css。
// app.use(require('stylus').middleware(path.join(__dirname, 'public')));

// 将前端资源的请求，托管到public前端目录下
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use(config.contextPath, account);
app.use(path.join(config.contextPath, 'api'), api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
