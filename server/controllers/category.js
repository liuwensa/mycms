/**
 * Created by admin on 2017/3/24.
 */

'use strict';

const categoryService = require('../services/category');


module.exports = {
  getCategory,
  addCategory,
  delCategory,
  updateCategory
};


/**
 * getCategory
 * @param {Object} req
 * @param {Object} res
 */
function getCategory(req, res) {
  const options = req.query || {};
  return categoryService.getCategory(options)
    .then((results) => {
      const arrTree    = changeToTreeJson(results);
      const treeResult = utils.transData(arrTree);
      return res.json({code: 200, msg: treeResult});
    });
}

/**
 * addCategory
 * @param {Object} req
 * @param {Object} res
 */
function addCategory(req, res) {
  const options = req.body;
  // const options = {
  //     parentID:'BJYBfouhl',
  //     sortPath: '0, ryEiCHKH, Hyqwm0_8, Bk46XAO8, BJYBfouhl',
  //     defaultUrl:'dgyi',
  //     contentTemp:'',
  //     name:'二级打怪',
  //     state:1,
  //     homePage:'dger',
  //     sortId:3,
  //     keywords:'二级打怪',
  //     comments:'二级打怪'
  // };
  return categoryService.addCategory(options)
    .then((results) => {
      return res.json({code: 200, msg: results});
    });
}

/**
 * updateCategory
 * @param {Object} req
 * @param {Object} res
 */
function updateCategory(req, res) {
  const id = req.params.id;

  if (!shortid.isValid(id)) {
    return res.json({code: 500, msg: '参数错误'});
  }

  const options = req.body;

  return categoryService.updateCategory(id, options).then((results) => {
    return res.json({code: 200, msg: results});
  });
}

/**
 * delCategory
 * @param {Object} req
 * @param {Object} res
 */
function delCategory(req, res) {
  const id = req.params.id;

  if (!shortid.isValid(id)) {
    return res.json({code: 500, msg: '参数错误'});
  }

  return categoryService.delCategory(id).then((results) => {
    return res.json({code: 200, msg: results});
  });
}

function changeToTreeJson(result) {
  const arrTree = [];
  let treeItem;
  for (let i = 0; i < result.length; i++) {
    treeItem = TreeInfo(result[i]);
    arrTree.push(treeItem);
  }
  return arrTree;
}

function TreeInfo(options) {
  return {
    id        : options._id,
    name      : options.name,
    keywords  : options.keywords,
    comments  : options.comments,
    sortPath  : options.sortPath,
    homePage  : options.homePage,
    defaultUrl: options.defaultUrl,
    date      : options.date,
    state     : options.state,
    parentID  : options.parentID,
    sortId    : options.sortId,
  };
}
