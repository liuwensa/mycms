/**
 * Created by admin on 2017/3/24.
 */

'use strict';

const tagsService = require('../services/tags');


module.exports = handleError({
  getTags,
  addTags,
  delTag,
  updateTag
});


/**
 * getTags
 * @param {Object} req
 * @param {Object} res
 */
function getTags(req, res) {
  const options  = req.query || {};
  const onlyName = options.onlyName || 0;
  delete options.onlyName;
  return tagsService.getTags(options)
    .then((results) => {
      let tags = results;
      if (onlyName) {
        tags = utils._.map(tags, 'name');
      }
      return res.json({code: 200, msg: tags});
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
