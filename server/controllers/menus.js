/**
 * Created by admin on 2017/6/14.
 */

'use strict';

const menusService = require('../services/menus');

module.exports = handleError({
  getMenus,
  addMenus,
  delMenus,
  updateMenus
});


/**
 * getMenus
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Request|Promise.<TResult>|*}
 */
function getMenus(req, res, next) {
  return menusService.getMenus()
    .then((results) => {
      const arrTree    = changeToTreeJson(results);
      const treeResult = utils.transData(arrTree);
      return next({code: 200, msg: treeResult})
    });
}

function changeToTreeJson(result) {
  const arrTree = [];
  for (let i = 0; i < result.length; i++) {
    const treeItem = TreeInfo(result[i]);
    arrTree.push(treeItem);
  }
  return arrTree;
}

function TreeInfo(options) {
  return {
    id      : options._id,
    name    : options.name,
    level   : options.level,
    route   : options.route,
    parentID: options.parentID
  };
}

/**
 * addMenus
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Request|Promise.<TResult>|*}
 */
function addMenus(req, res, next) {
  const options = req.body;

  return menusService.addMenus(options)
    .then((results) => next({code: 200, msg: results}));
}


/**
 * updateMenus
 * @param {Object} req
 * @param {Object} res
 */
function updateMenus(req, res, next) {
  const id = req.params.id;

  if (!shortid.isValid(id)) {
    return res.json({code: 500, msg: '参数错误'});
  }

  const options = req.body;

  return menusService.updateMenus(id, options)
    .then((results) => next({code: 200, msg: results}));
}

/**
 * delMenus
 * @param {Object} req
 * @param {Object} res
 */
function delMenus(req, res, next) {
  const id = req.params.id;

  if (!shortid.isValid(id)) {
    return res.json({code: 500, msg: '参数错误'});
  }

  return menusService.delMenus(id)
    .then((results) => next({code: 200, msg: results}));
}
