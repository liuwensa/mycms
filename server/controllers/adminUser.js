/**
 * Created by admin on 2017/3/13.
 */

'use strict';

const adminUserService = require('../services/adminUser');

module.exports = handleError({
  getAdminUserDtl,
  getAdminUsers,
  addAdminUser,
  updateAdminUser,
  delAdminUser,
});

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
