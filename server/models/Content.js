/**
 * Created by Administrator on 2015/4/15.
 * 管理员用户组对象
 */

'use strict';

const mongoose = require('mongoose');
const shortid  = require('shortid');

const Schema = mongoose.Schema;

const ContentCategory = require('./ContentCategory');
const AdminUser       = require('./AdminUser');

const ContentSchema = new Schema({
  _id        : {
    type     : String,
    unique   : true,
    'default': shortid.generate
  },
  title      : String,
  stitle     : String,
  type       : {type: String, default: 'content', comment : '发布形式 默认为普通文档,约定 singer 为单页面文档'},
  category   : {type: String, ref: 'ContentCategory', comment : '文章类别'},
  sortPath   : {type: String, comment : '存储所有父节点结构'},
  tags       : {type: String, comment : '标签'},
  keywords   : String,
  sImg       : {type: String, default: '/upload/images/defaultImg.jpg', comment : '文章小图'},
  discription: String,
  date       : {type: Date, default: Date.now},
  updateDate : {type: Date, default: Date.now, comment : '更新时间'},
  author     : {type: String, ref: 'AdminUser', comment : '文档作者'},
  state      : {type: Boolean, default: true, comment : '是否在前台显示，默认显示'},
  isTop      : {type: Number, default: 0, comment : '是否推荐，默认不推荐 0为不推荐，1为推荐'},
  clickNum   : {type: Number, default: 1},
  comments   : {},
  commentNum : {type: Number, default: 0, comment : '评论数'},
  likeNum    : {type: Number, default: 0, comment : '喜欢数'},
  likeUserIds: {type: String, comment : '喜欢该文章的用户ID集合'},
  from       : {type: String, default: '1', comment : '来源 1为原创 2为转载'},

  // 插件信息相关属性
  repositoryPath: {type: String, comment : 'git知识库路径'},
  downPath      : {type: String, comment : 'git项目下载地址'},
  previewPath   : {type: String, comment : '插件预览地址'}
});


ContentSchema.statics = {
//更新评论数
  updateCommentNum: function (contentId, key, callBack) {
    Content.findOne({'_id': contentId}, 'commentNum', function (err, doc) {
      if (err) {
        res.end(err)
      }
      if (key === 'add') {
        doc.commentNum = doc.commentNum + 1;
      } else if (key === 'del') {
        doc.commentNum = doc.commentNum - 1;
      }
      doc.save(function (err) {
        if (err) throw err;
        callBack();
      })
    })
  }
};


const Content = mongoose.model("Content", ContentSchema);

module.exports = Content;
