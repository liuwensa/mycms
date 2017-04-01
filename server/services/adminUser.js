/**
 * Created by admin on 2017/3/13.
 */

'use strict';

module.exports = {
  getAdminUsers: getAdminUsers,
  addAdminUser: addAdminUser,
  updateAdminUser: updateAdminUser,
  delAdminUser: delAdminUser,
  getAdminUserDetail: getAdminUserDetail,

};

/**
 * getAdminUsers
 * @param options
 * @returns {*}
 */
function getAdminUsers(options) {
  return db.AdminUser.find(options)
    .sort({'date': -1})
    .populate('group');
}

/**
 * addAdminUser
 * @param {Object} options
 * @returns {*}
 */
function addAdminUser(options) {
  const newObj = new db.AdminUser(options);
  return newObj.save();
}

/**
 * updateAdminUser
 * @param {String} id
 * @param {Object} options
 * @returns {*}
 */
function updateAdminUser(id, options) {
  return db.AdminUser.update({_id: id}, options);
}

/**
 * delAdminUser
 * @param {String} id
 * @returns {*}
 */
function delAdminUser(id) {
  return db.AdminUser.remove({_id: id});
}

/**
 * getAdminUserDetail
 * @param options
 * @returns {*}
 */
function getAdminUserDetail(options) {
  return db.AdminUser.findOne(options)
    .populate('group');
}
