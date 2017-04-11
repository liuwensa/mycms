/**
 * Created by admin on 2017/3/29.
 */

'use strict';

module.exports = {
  getCategory   ,
  addCategory   ,
  delCategory   ,
  updateCategory
};

/**
 * getCategory
 * @param options
 * @returns {*}
 */
function getCategory(options) {
  return db.Category
    .find(options)
    .sort({'sortId': 1});
}

/**
 * addTags
 * @param options
 * @returns {*}
 */
function addCategory(options) {
  const newObj = new db.Category(options);

  if (newObj.parentID == '0') {
    newObj.defaultUrl = newObj.homePage;
  } else {
    newObj.defaultUrl = newObj.defaultUrl + '/' + newObj.homePage;
  }

  newObj.sortPath = newObj.sortPath + ',' + newObj._id.toString();

  return newObj.save();
}

/**
 * updateCategory
 * @param {String} id
 * @param {Object} options
 * @returns {*}
 */
function updateCategory(id, options) {
  return db.Category.update({_id: id}, options);
}

/**
 * delCategory
 * @param {String} id
 * @returns {*}
 */
function delCategory(id) {
  return db.Category.remove({_id: id});
}
