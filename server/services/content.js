/**
 * Created by admin on 2017/3/10.
 */

'use strict';

module.exports = {
  getContents     : getContents,
  getContentDetail: getContentDetail,
  getContentsCount: getContentsCount
};

/**
 * 获取文档的列表
 * @param {Object} options
 * @returns {*}
 */
function getContents(options) {
  return db.Content.find(options);
}

/**
 * 获取文档的列表
 * @param options
 * @returns {*}
 */
function getContentDetail(options) {
  return db.Content.findOne(options)
    .populate('category')
    .populate('author');
}

/**
 * 文章总数
 * @param options
 */
function getContentsCount(options) {
  return db.Content.count(options);
}