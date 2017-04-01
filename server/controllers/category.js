/**
 * Created by admin on 2017/3/24.
 */

'use strict';

const categoryService = require('../services/category');


module.exports = {
  getContentCategory   : getContentCategory,
  addContentCategory   : addContentCategory,
  delContentCategory   : delContentCategory,
  updateContentCategory: updateContentCategory
};


/**
 * getContentCategory
 * @param {Object} req
 * @param {Object} res
 */
function getContentCategory(req, res) {
  const options = req.query || {};
  return categoryService.getContentCategory(options)
    .then((results) => {
      const arrTree    = changeToTreeJson(results);
      const treeResult = utils.transData(arrTree);
      return res.json({code: 200, msg: treeResult});
    });
}

/**
 * addContentCategory
 * @param {Object} req
 * @param {Object} res
 */
function addContentCategory(req, res) {
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
  return categoryService.addContentCategory(options)
    .then((results) => {
      return res.json({code: 200, msg: results});
    });
}

/**
 * updateContentCategory
 * @param {Object} req
 * @param {Object} res
 */
function updateContentCategory(req, res) {
  const id = req.params.id;

  if (!shortid.isValid(id)) {
    return res.json({code: 500, msg: '参数错误'});
  }

  const options = req.body;

  return categoryService.updateContentCategory(id, options).then((results) => {
    return res.json({code: 200, msg: results});
  });
}

/**
 * delContentCategory
 * @param {Object} req
 * @param {Object} res
 */
function delContentCategory(req, res) {
  const id = req.params.id;

  if (!shortid.isValid(id)) {
    return res.json({code: 500, msg: '参数错误'});
  }

  return categoryService.delContentCategory(id).then((results) => {
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
