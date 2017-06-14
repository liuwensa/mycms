/**
 * Created by admin on 2017/6/14.
 */

'use strict';

module.exports = {
  getMenus,
  addMenus,
  addSecondLevelMenu,
  addThreeLevelMenu,
  delMenus,
  updateMenus,
  updateSecondLevelMenu
};

/**
 * getMenus
 * @returns {*}
 */
function getMenus() {
  return db.Menus.find()
    .select({name: 1, parentID: 1, route: 1, level: 1});
}

/**
 * 创建一级菜单
 * @param options
 * @returns {*}
 */
function addMenus(options) {
  const newObj = new db.Menus(options);
  return newObj.save();
}

/**
 * 插入二级菜单的目录
 * @param {String} id
 * @param {Object} options
 * @returns {*}
 */
function addSecondLevelMenu(id, options) {
  return db.Menus.update({_id: id}, {'$addToSet': {children: options}});
}

/**
 * 插入三级级菜单的目录
 * @param {String} id
 * @param {String} subId
 * @param {Object} options
 * @returns {*}
 */
function addThreeLevelMenu(id, subId, options) {
  return db.Menus.update({_id: id, 'children._id': subId}, {'$addToSet': {'children.$.children': options}});
}

/**
 * updateMenus
 * @param {String} id
 * @param {Object} options
 * @returns {*}
 */
function updateMenus(id, options) {
  return db.Menus.update({_id: id}, options);
}

/**
 * 修改二级菜单的信息
 * @param {String} id
 * @param {String} subId
 * @param {Object} options
 * @returns {*}
 */
function updateSecondLevelMenu(id, subId, options) {
  return db.Menus.update({_id: id, 'children._id': subId}, {$set:{'children.$': options}});
}

/**
 * delMenus
 * @param {String} id
 * @returns {*}
 */
function delMenus(id) {
  return db.Menus.remove({_id: id});
}
