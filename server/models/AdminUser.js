/**
 * Created by admin on 2017/3/13.
 */

'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AdminGroup = require('./AdminGroup');

const AdminUserSchema = new Schema({
  _id     : {
    type     : String,
    unique   : true,
    'default': shortid.generate
  },
  name    : String,
  userName: String,
  password: {type: String, default: '7c45d1e02792f997'},
  email   : String,
  phoneNum: Number,
  comments: String,
  date    : {type: Date, default: Date.now},
  auth    : {type: Boolean, default: false},
  group   : {type: String, ref : 'AdminGroup'}
});

const AdminUser = mongoose.model('AdminUser', AdminUserSchema);

module.exports = AdminUser;

