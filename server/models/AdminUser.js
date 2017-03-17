/**
 * Created by Administrator on 2015/4/15.
 * 管理员对象
 */

'use strict';

const mongoose = require('mongoose');
const shortid  = require('shortid');

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
  logo    : {type: String, default: '/upload/images/defaultlogo.png'},
  auth    : {type: Boolean, default: false},
  group   : {
    type: String,
    ref : 'AdminGroup'
  }
});

AdminUserSchema.statics = {
  getOneItem: function (res, targetId, callBack) {
    AdminUser.findOne({'_id': targetId}).populate('group').exec(function (err, user) {
      if (err) {
        res.end(err);
      }
      callBack(user);
    })
  }
};


const AdminUser = mongoose.model('AdminUser', AdminUserSchema);

module.exports = AdminUser;

