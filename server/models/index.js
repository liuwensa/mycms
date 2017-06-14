/**
 * Created by admin on 2017/3/9.
 */

'use strict';

const mongoose = require('mongoose');
const path     = require('path');

const dbConf = config.db;

const dbs = {};

// mongodb://user:pass@ip:port/database
const connectionURL = `${dbConf.dbprefix}${dbConf.dbhost}/${dbConf.dbname}`;

// 数据库连接
const db = mongoose.connect(connectionURL);

db.connection.on('error', (error) => {
  logger.error('数据库连接失败', connectionURL, error.message);
});

db.connection.on('open', () => {
  logger.info('数据库连接成功');
});


mongoose.set('debug', (collectionName, methodName, arg1, arg2, arg3) => {
  logger.info('[Mongoose] :', collectionName, methodName, arg1, arg2, arg3);
});

fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf('.') !== -1) && (file !== 'index.js') && (file !== 'db');
  })
  .forEach(function (file) {
    const modelName = file.replace('.js', '');
    dbs[modelName]  = require(path.join(__dirname, file));
  });

module.exports = dbs;
