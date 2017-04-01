/**
 * Created by admin on 2017/3/24.
 */

'use strict';

module.exports = {
  getTags         : getTags,
  addContentTags  : addContentTags,
  delContentTag   : delContentTag,
  updateContentTag: updateContentTag
};

/**
 * getTags
 * @param options
 * @returns {*}
 */
function getTags(options) {
  return db.ContentTags.find(options);
}

/**
 * addContentTags
 * @param options
 * @returns {*}
 */
function addContentTags(options) {
  return db.ContentTags
    .find()
    .or([{'name': options.name}, {alias: options.alias}])
    .then((tags) => {
      if (tags.length > 0) {
        throw new Error('名称或者别名已存在！');
      } else {
        const newObj = new db.ContentTags(options);
        return newObj.save();
      }
    });
}

/**
 * updateContentTag
 * @param {String} id
 * @param {Object} options
 * @returns {*}
 */
function updateContentTag(id, options) {
  return db.ContentTags.update({_id: id}, options);
}

/**
 * delContentTag
 * @param {String} id
 * @returns {*}
 */
function delContentTag(id) {
  return db.ContentTags.remove({_id: id});
}
