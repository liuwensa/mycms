/**
 * Created by admin on 2017/3/10.
 */

'use strict';

module.exports = {
  getContents     : getContents,
  getContentDetail: getContentDetail,
  getContentsCount: getContentsCount,
  delContent      : delContent,
  updateContent   : updateContent
};

/**
 * 获取文档的列表
 * @param {Object} options
 * @param {Object} orderBy
 * @param {Number} start
 * @param {Number} count
 * @returns {*}
 */
function getContents(options, orderBy, start, count) {
  return Promise.props({
    list : db.Content.find(options).sort(orderBy).skip(start).limit(count).populate('category').populate('author'),
    total: db.Content.find(options).count()
  });
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

/**
 * delContent
 * @param id
 */
function delContent(id) {
  return db.Content.remove({_id: id});
}

/**
 * updateContent
 * @param id
 * @param options
 * @returns {*}
 */
function updateContent(id, options) {
  return db.Content.update({_id: id}, options);
}