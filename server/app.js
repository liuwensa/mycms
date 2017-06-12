'use strict';

require('./globals');

const http         = require('http');
const path         = require('path');
const express      = require('express');
const session      = require('express-session');
const RedisStore   = require('connect-redis')(session);
const favicon      = require('serve-favicon');
const log4js       = require('log4js');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const compression  = require('compression');
// const io           = require('socket.io')();
const moment       = require('moment');
const partials     = require('express-partials');
const ejs          = require('ejs');
const expressJwt   = require('express-jwt');
const jwt          = require('jsonwebtoken');

const resultHandle = require('./middlewares/result-handle');

const app = express();

// view engine setup
//静态压缩
app.use(compression());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('.html', ejs.__express);
app.engine('.ejs', ejs.__express);
app.use(partials());

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(log4js.connectLogger(logger, config.log));
app.use(bodyParser.json({limit: '50mb'})); // 限制上传5M
app.use(bodyParser.urlencoded({extended: false, limit: '50mb'}));
app.use(cookieParser(config.session.secret));

app.use(session({
  secret           : config.session.secret,
  store            : new RedisStore({
    port: config.redis.port,
    host: config.redis.host,
    pass: config.redis.psd,
    // 过期时间
    ttl : 1800
  }),
  resave           : true,
  saveUninitialized: true
}));

//数据格式化
app.locals.myDateFormat = function (date) {
  moment.locale('zh-cn');
  return moment(date).startOf('hour').fromNow();
};

app.locals.searchKeyWord = function (content, key) {
  var newContent = content;
  if (newContent && key) {
    var keyword = key.replace(/(^\s*)|(\s*$)/g, "");
    if (keyword != '') {
      var reg    = new RegExp(keyword, 'gi');
      newContent = content.replace(reg, '<span style="color:red">' + key + '</span>');
    }
  }
  return newContent;
};

app.use(express.static(path.join(__dirname, 'public')));

// app.use(expressJwt({secret: 'secret'}).unless({path: ['/admin/login', '/admin']}));
//
// app.use(function (err, req, res, next) {
//   if (err.name === 'UnauthorizedError') {
//     return next({status: 'invalidToken', code: 401});
//   } else {
//     return next(err);
//   }
// });

app.use('/adminapi', require('./routes/admin/api'));
app.use('/admin', require('./routes/admin'));


// catch 404 and forward to error handler
app.use((req, res, next) => {
  return next({status: 'notFound', code: 404});
});

app.use(resultHandle.resultHandle({format: 'JSON', views: {}}));

app.set('port', config.projPort);

const server = http.createServer(app);

// 启动HTTP 服务时，注入Socket.io
// io.attach(server);

server.listen(app.get('port'), '127.0.0.1', function (err) {
  if (err) {
    throw err;
  } else {
    logger.info(`server start on ${app.get('port')}`);
  }
});
