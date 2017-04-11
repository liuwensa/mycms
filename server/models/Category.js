/**
 * Created by admin on 2017/3/13.
 */

'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  _id        : {
    type   : String,
    unique : true,
    default: shortid.generate
  },
  uid        : {type: Number, default: 0},
  name       : String,
  keywords   : String,
  sortId     : {type: Number, default: 1, comment: '排序 正整数'},
  parentID   : {type: String, default: '0'},
  state      : {type: String, default: '0', comment: '是否公开'},
  date       : {type: Date, default: Date.now},
  defaultUrl : {type: String, default: '', comment: '父类别的默认目录'},
  homePage   : {type: String, default: 'ui', comment: '必须唯一'},
  sortPath   : {type: String, default: '0', comment: '存储所有父节点结构'},
  comments   : String
});

const Category = mongoose.model('CategorySchema', CategorySchema);

module.exports = Category;
