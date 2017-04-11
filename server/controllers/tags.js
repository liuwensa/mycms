/**
 * Created by admin on 2017/3/24.
 */

'use strict';

const tagsService = require('../services/tags');


module.exports = {
  getTags,
  addTags,
  delTag,
  updateTag
};


/**
 * getTags
 * @param {Object} req
 * @param {Object} res
 */
function getTags(req, res) {
  const options = req.query || {};

  return tagsService.getTags(options)
    .then((results) => {
      return res.json({code: 200, msg: results});
    });
}

/**
 * addAdminUser
 * @param {Object} req
 * @param {Object} res
 */
function addTags(req, res) {
  const options = req.body;

  return tagsService.addTags(options)
    .then((results) => {
      return res.json({code: 200, msg: results});
    });
}

/**
 * updateTag
 * @param {Object} req
 * @param {Object} res
 */
function updateTag(req, res) {
  const id = req.params.id;

  if (!shortid.isValid(id)) {
    return res.json({code: 500, msg: '参数错误'});
  }

  const options = req.body;

  return tagsService.updateTag(id, options).then((results) => {
    return res.json({code: 200, msg: results});
  });
}

/**
 * delTag
 * @param {Object} req
 * @param {Object} res
 */
function delTag(req, res) {
  const id = req.params.id;

  if (!shortid.isValid(id)) {
    return res.json({code: 500, msg: '参数错误'});
  }

  return tagsService.delTag(id).then((results) => {
    return res.json({code: 200, msg: results});
  });
}
