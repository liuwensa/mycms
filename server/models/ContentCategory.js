/**
 * Created by Administrator on 2015/4/15.
 * 文章类别对象
 */

'use strict';

const mongoose = require('mongoose');
const shortid  = require('shortid');

const TemplateItems = require('./TemplateItems');

const Schema = mongoose.Schema;

const ContentCategorySchema = new Schema({
  _id        : {
    type     : String,
    unique   : true,
    'default': shortid.generate
  },
  uid        : {type: Number, default: 0},
  name       : String,
  keywords   : String,
  sortId     : {type: Number, default: 1, comment: '排序 正整数'},
  parentID   : {type: String, default: '0'},
  state      : {type: String, default: '1', comment: '是否公开 默认公开'},
  date       : {type: Date, default: Date.now},
  contentTemp: {type: String, ref: 'TemplateItems', comment: '内容模板'},
  defaultUrl : {type: String, default: '', comment: '父类别的默认目录'},
  homePage   : {type: String, default: 'ui', comment: '必须唯一'},
  sortPath   : {type: String, default: '0', comment: '存储所有父节点结构'},
  comments   : String
});


ContentCategorySchema.statics = {
  //更新大类模板，子类模板同步更新
  updateCategoryTemps: function (req, res, cateId) {
    if (shortid.isValid(cateId)) {
      var cateQuery = {'sortPath': {$regex: new RegExp(cateId, 'i')}};
      ContentCategory.update(cateQuery, {$set: {contentTemp: req.body.contentTemp}}, {multi: true}, function (err) {
        if (err) {
          res.end(err);
        }
      })
    } else {
      res.end(config.systemIllegalParam);
    }
  },
  //根据Id查询类别信息
  getCateInfoById    : function (cateId, callBack) {
    ContentCategory.findOne({"_id": cateId}).populate('contentTemp').exec(function (err, doc) {
      if (err) {
        res.end(err);
      } else {

        callBack(doc);
      }
    })
  }
};

const ContentCategory = mongoose.model('ContentCategory', ContentCategorySchema);

module.exports = ContentCategory;
