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
    dbname  : 'doracms',
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
  },

  // 邮件相关设置
  site_email                  : 'xx@163.com',
  site_email_psd              : 'xxx',
  email_findPsd               : 'findPsd',
  email_reg_active            : 'reg_active',
  email_notice_contentMsg     : 'notice_contentMsg',
  email_notice_contentBug     : 'notice_contentBug',
  email_notice_user_contentMsg: 'notice_user_contentMsg',
  email_notice_user_reg       : 'notice_user_reg',


  // 信息提示相关
  systemIllegalParam             : '非法参数',
  system_noPower                 : '对不起，您无权执行该操作！',
  system_atLeast_one             : '请选择至少一项后再执行删除操作！',
  system_batch_delete_not_allowed: '对不起，该模块不允许批量删除！'
};