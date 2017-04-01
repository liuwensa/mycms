/**
 * Created by admin on 2017/3/24.
 */

'use strict';

const tagsService = require('../services/tags');


module.exports = {
  getTags         : getTags,
  addContentTags  : addContentTags,
  delContentTag   : delContentTag,
  updateContentTag: updateContentTag
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
function addContentTags(req, res) {
  const options = req.body;

  return tagsService.addContentTags(options)
    .then((results) => {
      return res.json({code: 200, msg: results});
    });
}

/**
 * updateContentTag
 * @param {Object} req
 * @param {Object} res
 */
function updateContentTag(req, res) {
  const id = req.params.id;

  if (!shortid.isValid(id)) {
    return res.json({code: 500, msg: '参数错误'});
  }

  const options = req.body;

  return tagsService.updateContentTag(id, options).then((results) => {
    return res.json({code: 200, msg: results});
  });
}

/**
 * delContentTag
 * @param {Object} req
 * @param {Object} res
 */
function delContentTag(req, res) {
  const id = req.params.id;

  if (!shortid.isValid(id)) {
    return res.json({code: 500, msg: '参数错误'});
  }

  return tagsService.delContentTag(id).then((results) => {
    return res.json({code: 200, msg: results});
  });
}
