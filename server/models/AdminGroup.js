/**
 * Created by admin on 2017/3/13.
 */

'use strict';

const mongoose = require('mongoose');
const shortid  = require('shortid');

const Schema = mongoose.Schema;

const AdminGroupSchema = new Schema({
  _id     : {type: String, unique: true, default: shortid.generate},
  name    : String,
  power   : String,
  date    : {type: Date, default: Date.now},
  comments: String
});


const AdminGroup = mongoose.model('AdminGroup', AdminGroupSchema);

module.exports = AdminGroup;
