/**
 * Created by admin on 2017/3/24.
 */

'use strict';

module.exports = {
  getTags,
  addTags,
  delTag,
  updateTag
};

/**
 * getTags
 * @param options
 * @returns {*}
 */
function getTags(options) {
  return db.Tags.find(options);
}

/**
 * addTags
 * @param options
 * @returns {*}
 */
function addTags(options) {
  return db.Tags
    .find()
    .or([{'name': options.name}, {alias: options.alias}])
    .then((tags) => {
      if (tags.length > 0) {
        throw new Error('名称或者别名已存在！');
      } else {
        const newObj = new db.Tags(options);
        return newObj.save();
      }
    });
}

/**
 * updateTag
 * @param {String} id
 * @param {Object} options
 * @returns {*}
 */
function updateTag(id, options) {
  return db.Tags.update({_id: id}, options);
}

/**
 * delTag
 * @param {String} id
 * @returns {*}
 */
function delTag(id) {
  return db.Tags.remove({_id: id});
}
