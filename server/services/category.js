/**
 * Created by admin on 2017/3/29.
 */

'use strict';

module.exports = {
  getContentCategory   : getContentCategory,
  addContentCategory   : addContentCategory,
  delContentCategory   : delContentCategory,
  updateContentCategory: updateContentCategory
};

/**
 * getContentCategory
 * @param options
 * @returns {*}
 */
function getContentCategory(options) {
  return db.ContentCategory
    .find(options)
    .sort({'sortId': 1});
}

/**
 * addContentTags
 * @param options
 * @returns {*}
 */
function addContentCategory(options) {
  const newObj = new db.ContentCategory(options);

  if (newObj.parentID == '0') {
    newObj.defaultUrl = newObj.homePage;
  } else {
    newObj.defaultUrl = newObj.defaultUrl + '/' + newObj.homePage;
  }

  newObj.sortPath = newObj.sortPath + ',' + newObj._id.toString();

  return newObj.save();
}

/**
 * updateContentCategory
 * @param {String} id
 * @param {Object} options
 * @returns {*}
 */
function updateContentCategory(id, options) {
  return db.ContentCategory.update({_id: id}, options);
}

/**
 * delContentCategory
 * @param {String} id
 * @returns {*}
 */
function delContentCategory(id) {
  return db.ContentCategory.remove({_id: id});
}
