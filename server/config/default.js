/**
 * Created by admin on 2017/3/9.
 */

'use strict';

module.exports = {
  // debug 为 true 时，用于本地调试
  debug         : false,
  authCookieName: 'nodecms',
  encryptKey    : 'nodecms',
  projPort      : 22631,
  session       : {
    secret: 'my-node-cms'
  },
  db            : {
    dbprefix: 'mongodb://',
    dbhost  : '127.0.0.1',
    port    : '27017',
    dbname  : 'nodecms',
    username: '',
    password: ''
  },
  redis         : {
    host: '127.0.0.1',
    port: 6379,
    psd : '',
    db  : 0
  },
  log           : {
    nolog         : /\.(js|css|png|jpeg|ico|gif|svg)$/,
    level         : 'AUTO',
    format        : ':remote-addr :method :url :status :response-time ms :user-agent :content-length',
    logFileDir    : 'E:\\raid\\logs\\nodecms\\',
    needConsole   : true,
    replaceConsole: true
  }
};