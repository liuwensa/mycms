/**
 * Created by admin on 2017/3/13.
 */

'use strict';

const PW        = require('png-word');

const RW               = require('../util/randomWord');
const adminUserService = require('../services/adminUser');
const adminFunc        = require('../models/db/adminFunc');

const rw       = RW('abcdefghijklmnopqrstuvwxyz1234567890');
const pngword  = new PW(PW.GRAY);
const siteInfo = config.siteInfo;
const sysMsg   = config.sysMsg;

module.exports = {
  getAdminUsers: getAdminUsers,
  addAdminUser: addAdminUser,
  updateAdminUser: updateAdminUser,
  delAdminUser: delAdminUser,
  adminLogin      : adminLogin,
  verificationCode: verificationCode,
  doLogin         : doLogin,
  logout          : logout
};

/**
 * 获取系统用户列表
 * @param {Object} req
 * @param {Object} res
 */
function getAdminUsers(req, res) {
  return adminUserService.getAdminUsers({}).then((results) => {
    return res.json({code: 200, msg: results});
  });
}

/**
 * addAdminUser
 * @param {Object} req
 * @param {Object} res
 */
function addAdminUser(req, res) {
  const options = req.body;

  return adminUserService.addAdminUser(options).then((results) => {
    return res.json({code: 200, msg: results});
  });
}

/**
 * updateAdminUser
 * @param {Object} req
 * @param {Object} res
 */
function updateAdminUser(req, res) {
  const id = req.params.id;

  if (!shortid.isValid(id)) {
    return res.json({code: 500, msg: '参数错误'});
  }

  const options = req.body;

  return adminUserService.updateAdminUser(id, options).then((results) => {
    return res.json({code: 200, msg: results});
  });
}

/**
 * delAdminUser
 * @param {Object} req
 * @param {Object} res
 */
function delAdminUser(req, res) {
  const id = req.params.id;

  if (!shortid.isValid(id)) {
    return res.json({code: 500, msg: '参数错误'});
  }

  return adminUserService.delAdminUser(id).then((results) => {
    return res.json({code: 200, msg: results});
  }).catch((err) => {
    console.log('=============', err);
    return res.json({code: 500, msg: err});
  });
}

/**
 * 登录页面
 * @param {Object} req
 * @param {Object} res
 */
function adminLogin(req, res) {
  req.session.vnum = rw.random(4);
  res.render('manage/adminLogin', {
    title      : siteInfo.SITETITLE,
    description: 'DoraCMS后台管理登录'
  });
}

/**
 * 获取验证码
 * @param {Object} req
 * @param {Object} res
 */
function verificationCode(req, res) {
  const word = req.session.vnum;
  pngword.createPNG(word, function (word) {
    res.end(word);
  });
}

/**
 * doLogin
 * @param {Object} req
 * @param {Object} res
 * @returns {*}
 */
function doLogin(req, res) {
  const userName = req.body.userName;
  const password = req.body.password;
  const vnum     = req.body.vnum;
  const newPsd   = db.DbOpt.encrypt(password, config.encryptKey);

  if (vnum != req.session.vnum) {
    req.session.vnum = rw.random(4);
    res.end('验证码有误！');
  }

  if (!utils.validator.isUserName(userName) || !utils.validator.isPsd(password)) {
    res.end(sysMsg.systemIllegalParam);
  }

  return adminUserService.getAdminUserDetail({
    userName: userName,
    password: newPsd
  }).then((user) => {
    if (user) {
      req.session.adminPower    = user.group.power;
      req.session.adminlogined  = true;
      req.session.adminUserInfo = user;
      // 获取管理员通知信息
      adminFunc.getAdminNotices(req, res, function (noticeObj) {
        req.session.adminNotices = noticeObj;
        // 存入操作日志
        db.SystemOptionLog.addUserLoginLogs(req, res, adminFunc.getClienIp(req));
        res.end('success');
      });
    } else {
      res.end('用户名或密码错误');
    }
  });
}

/**
 * 退出登录
 * @param {Object} req
 * @param {Object} res
 */
function logout(req, res) {
  req.session.adminlogined  = false;
  req.session.adminPower    = '';
  req.session.adminUserInfo = '';
  res.redirect('/admin');
}
