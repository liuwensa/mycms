/**
 * Created by admin on 2017/6/14.
 */

'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// const MenusSchema = new Schema({
//   _id     : {type: String, unique: true, default: shortid.generate},
//   name    : String,
//   children: [{
//     _id     : {type: String, unique: true, default: shortid.generate},
//     name    : String,
//     children: [{
//       _id  : {type: String, unique: true, default: shortid.generate},
//       name : String,
//       route: String
//     }]
//   }]
// });

const MenusSchema = new Schema({
  _id     : {type: String, unique: true, default: shortid.generate},
  name    : String,
  level   : {type: Number, default: 1},
  parentID: {type: String, default: '0'},
  route   : {type: String, default: ''},
});

const Menus = mongoose.model('Menus', MenusSchema);

module.exports = Menus;
