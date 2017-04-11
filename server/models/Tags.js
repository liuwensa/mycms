/**
 * Created by admin on 2017/3/13.
 */

'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TagsSchema = new Schema({
  _id     : {
    type     : String,
    unique   : true,
    'default': shortid.generate
  },
  name    : String,
  alias   : {type: String, comment: '别名'},
  date    : {type: Date, default: Date.now},
  comments: String
});

const Tags = mongoose.model('Tags', TagsSchema);

module.exports = Tags;
