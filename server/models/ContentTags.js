/**
 * Created by Administrator on 2015/4/15.
 * 文章标签对象
 */

'use strict';

const mongoose = require('mongoose');
const shortid  = require('shortid');

const Schema = mongoose.Schema;

const ContentTagsSchema = new Schema({
  _id     : {
    type     : String,
    unique   : true,
    'default': shortid.generate
  },
  name    : String,
  alias   : {type: Date, comment: '别名'},
  date    : {type: Date, default: Date.now},
  comments: String
});

const ContentTags = mongoose.model("ContentTags", ContentTagsSchema);

module.exports = ContentTags;
