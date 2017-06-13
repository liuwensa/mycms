/**
 * Created by admin on 2017/4/13.
 */

'use strict';

const request = require('request');
const rp      = require('request-promise');
const PW      = require('png-word');

const adminUserService = require('../services/adminUser');
const RW               = require('../tools/randomWord');

const rw      = RW('abcdefghijklmnopqrstuvwxyz1234567890');
const pngword = new PW(PW.GRAY);

module.exports = handleError({
  verificationCode,
  login,
  logout,
  uploadImage,
  uploadUeditorImage,
  remoteUeditorImage
});

/**
 * 登录验证
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
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
        const userInfo       = {
          name    : result.name,
          userName: result.userName
        };
        req.session.vnum     = rw.random(4);
        req.session.userInfo = userInfo;
        return next({code: 200, msg: userInfo});
      } else {
        return next({code: 500, desc: '密码不正确！'});
      }
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
function logout(req, res, next) {
  req.session.destroy();
  return next({code: 200, msg: '退出登录成功！'});
}

function uploadImage(req, res) {
  const url = `${config.imageUrl}/upload/images`;
  pipToImageServe(url, req, res);
}

function uploadUeditorImage(req, res) {
  const url = `${config.imageUrl}/ueditor/upload/image`;
  pipToImageServe(url, req, res);
}

function remoteUeditorImage(req, res) {
  let urls = req.body['source[]'] || req.body.source || [];

  if (!Array.isArray(urls)) {
    urls = [urls];
  }

  return rp.post({
    uri : `${config.imageUrl}/ueditor/download/image`,
    body: {
      urls: urls
    },
    json: true
  }).then((ret) => {
    return res.json(ret);
  }).catch((err) => {
    return res.json({state: 'FAILED', tip: '远程图片抓取失败', list: []});
  });
}

function pipToImageServe(url, req, res) {
  if (req.method === 'POST') {
    const thePiper = request.post({url: url, timeout: 1000 * 600});
    req.pipe(thePiper);
    thePiper.pipe(res);
  } else {
    return res.end();
  }
}