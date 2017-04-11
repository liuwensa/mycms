/**
 * Created by admin on 2017/3/13.
 */

'use strict';

var mongoose = require('mongoose');
var shortid  = require('shortid');
var Schema   = mongoose.Schema;

var AdminGroupSchema = new Schema({
  _id     : {
    type     : String,
    unique   : true,
    'default': shortid.generate
  },
  name    : String,
  power   : String,
  date    : {type: Date, default: Date.now},
  comments: String
});


var AdminGroup = mongoose.model('AdminGroup', AdminGroupSchema);

module.exports = AdminGroup;
