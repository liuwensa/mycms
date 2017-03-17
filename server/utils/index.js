/**
 * Created by liuwensa on 2017/3/13.
 */

'use strict';

const uuid      = require('node-uuid');
const lodash    = require('lodash');
const validator = require('validator');
const cryptos   = require('crypto');

//自定义校验扩展
validator.extend('isUserName', function (str) {
  return /^[a-zA-Z][a-zA-Z0-9_]{4,11}$/.test(str);
});

validator.extend('isGBKName', function (str) {
  return /[\u4e00-\u9fa5]/.test(str);
});

validator.extend('isPsd', function (str) {
  return /(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{5,}/.test(str);
});

validator.extend('isQQ', function (str) {
  return RegExp(/^[1-9][0-9]{4,9}$/).test(str);
});

//只能是英文
validator.extend('isEn', function (str) {
  return /^\S+[a-z A-Z]$/.test(str);
});

module.exports = {
  uuid     : uuid,
  validator: validator,
  _        : lodash,

  myuuid: function () {
    return uuid().replace(/-/g, '');
  },
  md5   : function (content) {
    const buf = new Buffer(content);
    content   = buf.toString('binary');
    const md5 = cryptos.createHash('md5');
    md5.update(content);
    return md5.digest('hex');
  }
};
