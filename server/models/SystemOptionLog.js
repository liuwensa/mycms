/**
 * Created by Administrator on 2015/9/28.
 * 系统操作日志
 */

'use strict';

const mongoose = require('mongoose');
const shortid  = require('shortid');

const Schema = mongoose.Schema;

const adminFunc = require('./db/adminFunc');

const SystemOptionLogSchema = new Schema({
  _id : {
    type     : String,
    unique   : true,
    'default': shortid.generate
  },
  type: String,
  date: {type: Date, default: Date.now},
  logs: String
});

SystemOptionLogSchema.statics = {
  // 添加用户登录日志
  addUserLoginLogs: function (req, res, targetIp) {
    var loginLog  = new SystemOptionLog();
    loginLog.type = 'login';
    loginLog.logs = req.session.adminUserInfo.userName + ' 登录，IP:' + targetIp;
    loginLog.save(function (err) {
      if (err) {
        res.end(err);
      }
    });
  }
};

const SystemOptionLog = mongoose.model('SystemOptionLog', SystemOptionLogSchema);

module.exports = SystemOptionLog;
