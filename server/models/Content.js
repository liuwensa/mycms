/**
 * Created by admin on 2017/3/13.
 */

'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Category  = require('./Category');
const AdminUser = require('./AdminUser');

const ContentSchema = new Schema({
  _id        : {
    type   : String,
    unique : true,
    default: shortid.generate
  },
  title      : String,
  stitle     : String,
  category   : {type: String, ref: 'Category', comment: '文章类别'},
  sortPath   : {type: String, comment: '存储所有父节点结构'},
  tags       : {type: String, comment: '标签'},
  keywords   : String,
  coverImage : {type: String, default: '', comment: '图片'},
  discription: String,
  content    : {},
  source     : String,
  date       : {type: Date, default: Date.now},
  updateDate : {type: Date, default: Date.now, comment: '更新时间'},
  publisher  : {type: String, ref: 'AdminUser', comment: '发布人'},
  author     : {type: String, comment: '文档作者'},
  ispublish  : {type: Boolean, default: false, comment: '是否发布'},
  isTop      : {type: Number, default: 0, comment: '是否推荐，默认不推荐 0为不推荐，1为推荐'},
  pviews     : {type: Number, default: 1, comment: '阅读量'},
  isoriginal : {type: Boolean, default: true, comment: '是否原创'}
});

const Content = mongoose.model('Content', ContentSchema);

module.exports = Content;
