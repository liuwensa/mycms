/**
 * Created by admin on 2017/3/10.
 */

'use strict';

module.exports = {
  getContents,
  getContentDetail,
  getContentsCount,
  addContent,
  delContent,
  updateContent
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
 * @param id
 * @returns {*}
 */
function getContentDetail(id) {
  return db.Content.findOne({_id: id});
    // .populate('category')
    // .populate('author');
}

/**
 * 文章总数
 * @param options
 */
function getContentsCount(options) {
  return db.Content.count(options);
}

/**
 * addContent
 * @param options
 */
function addContent(options) {
  const newObj = new db.Content(options);
  return newObj.save();
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