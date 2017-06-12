/**
 * Created by admin on 2017/3/13.
 */

'use strict';

const PW = require('png-word');

const RW               = require('../tools/randomWord');
const adminUserService = require('../services/adminUser');

const rw      = RW('abcdefghijklmnopqrstuvwxyz1234567890');
const pngword = new PW(PW.GRAY);

module.exports = {
  getAdminUserDtl,
  getAdminUsers,
  addAdminUser,
  updateAdminUser,
  delAdminUser,
  adminLogin,
  verificationCode,
  login,
  logout
};

/**
 * 获取系统用户列表
 * @param {Object} req
 * @param {Object} res
 */
function getAdminUsers(req, res) {
  return adminUserService.getAdminUsers({})
    .then((results) => {
      return res.json({code: 200, msg: results});
    });
}

/**
 * 获取系统用户列表
 * @param {Object} req
 * @param {Object} res
 */
function getAdminUserDtl(req, res) {
  const id = req.params.id;

  if (!shortid.isValid(id)) {
    return res.json({code: 500, msg: '参数错误'});
  }

  return adminUserService.getAdminUserDetail({_id: id}).then((results) => {
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
    return res.json({code: 500, msg: err});
  });
}

function login(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  if (!username) {
    return next({code: 500, desc: '参数错误：username！'});
  }

  if (!password) {
    return next({code: 500, desc: '参数错误：password！'});
  }

  return adminUserService.getAdminUserDetail({name: username})
    .then((result) => {
      if (!result) {
        return next({code: 500, desc: '用户不存在！'});
      } else if (result.password === password) {
        const userInfo = {
          name:  result.name,
          userName: result.userName
        };
        req.session.userInfo = userInfo;
        return next({code: 200, msg: userInfo});
      } else {
        return next({code: 500, desc: '密码不正确！'});
      }
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
    description: ''
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
