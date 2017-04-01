'use strict';

require('./globals');

const http         = require('http');
const express      = require('express');
const session      = require('express-session');
const RedisStore   = require('connect-redis')(session);
const path         = require('path');
const favicon      = require('serve-favicon');
const log4js       = require('log4js');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const compression  = require('compression');
const io           = require('socket.io')();
const moment       = require('moment');
const partials     = require('express-partials');
const ueditor      = require('ueditor-nodejs');
const ejs          = require('ejs');

const tags      = require('./routes/tags');
const category  = require('./routes/category');
const content   = require('./routes/content');
const adminUser = require('./routes/adminUser');
const admin     = require('./routes/admin');

/*实例化express对象*/
var app = express();

//ueditor注册
app.use('/ueditor/ue', ueditor({//这里的/ueditor/ue是因为文件件重命名为了ueditor,如果没改名，那么应该是/ueditor版本号/ue
  configFile : '/ueditor/jsp/config.json',//如果下载的是jsp的，就填写/ueditor/jsp/config.json
  mode       : 'local', //本地存储填写local
  accessKey  : '',//本地存储不填写，bcs填写
  secrectKey : '',//本地存储不填写，bcs填写
  staticPath : path.join(__dirname, 'public'), //一般固定的写法，静态资源的目录，如果是bcs，可以不填
  dynamicPath: '/upload/blogpicture' //动态目录，以/开头，bcs填写buckect名字，开头没有/.路径可以根据req动态变化，可以是一个函数，function(req) { return '/xx'} req.query.action是请求的行为，uploadimage表示上传图片，具体查看config.json.
}));


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

//解决异步层次混乱问题
app.use(require('express-promise')());

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


// app.use(function (req, res, next) {
//   // 针对注册会员
//   res.locals.logined       = req.session.logined;
//   res.locals.userInfo      = req.session.user;
//   // 针对管理员
//   res.locals.adminlogined  = req.session.adminlogined;
//   res.locals.adminUserInfo = req.session.adminUserInfo;
//   res.locals.adminNotices  = req.session.adminNotices;
//   // 指定站点域名
//   res.locals.myDomain      = req.headers.host;
//   next();
// });


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

app.use('/adminuser', adminUser);
app.use('/adminapi', tags);
app.use('/adminapi', category);
app.use('/adminapi', content);
app.use('/admin', admin);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err    = new Error('Not Found');
  err.status = 404;
  return res.json({code: 404, msg: err.message});
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  return res.json({code: 500, msg: err.message});
});


app.set('port', config.projPort);

const server = http.createServer(app);

// 启动HTTP 服务时，注入Socket.io
io.attach(server);

server.listen(app.get('port'), '127.0.0.1', function (err) {
  if (err) {
    throw err;
  } else {
    logger.info(`server start on ${app.get('port')}`);
  }
});
