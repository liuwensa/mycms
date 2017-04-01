/**
 * Created by admin on 2017/3/31.
 */

'use strict';

const contentService = require('../services/content');


module.exports = {
  getContents  : getContents,
  addContent   : addContent,
  delContent   : delContent,
  updateContent: updateContent
};


/**
 * getContent
 * @param {Object} req
 * @param {Object} res
 */
function getContents(req, res) {
  const page  = +req.query.page || 1;
  const count = +req.query.count || 10;
  const order = req.query.order || '';

  const category  = req.query.category;
  const state     = +req.query.state;
  const searchKey = req.query.searchKey;

  const options = {};

  if (category) {
    options.category = category;
  }

  if (state === 0 || state === 1) {
    options.state = state;
  }

  if (searchKey) {
    const reKey = new RegExp(searchKey, 'i');
    options.$or = [
      {'comments': {$regex: reKey}},
      {'title': {$regex: reKey}}
    ];
  }

  const start = (page - 1) * count;

  const orderBy = {};
  let Str;
  let A         = 'date';
  let B         = 'DESC';

  if (order) {
    Str        = order.split('_');
    A          = Str[0];
    B          = Str[1];
    orderBy[A] = B;
  } else {
    orderBy.date = -1;
  }

  return contentService.getContents(options, orderBy, start, count)
    .then((results) => {
      return res.json({code: 200, msg: results});
    });
}

/**
 * addContent
 * @param {Object} req
 * @param {Object} res
 */
function addContent(req, res) {
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
  return contentService.addContentCategory(options)
    .then((results) => {
      return res.json({code: 200, msg: results});
    });
}

/**
 * updateContent
 * @param {Object} req
 * @param {Object} res
 */
function updateContent(req, res) {
  const id = req.params.id;

  if (!shortid.isValid(id)) {
    return res.json({code: 500, msg: '参数错误'});
  }

  const options = req.body;

  return contentService.updateContent(id, options).then((results) => {
    return res.json({code: 200, msg: results});
  });
}

/**
 * delContent
 * @param {Object} req
 * @param {Object} res
 */
function delContent(req, res) {
  const id = req.params.id;

  if (!shortid.isValid(id)) {
    return res.json({code: 500, msg: '参数错误'});
  }

  return contentService.delContent(id).then((results) => {
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
