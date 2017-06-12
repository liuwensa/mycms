/**
 * Created by admin on 2017/6/9.
 */

'use strict';

const fs     = require('fs');
const mkdirp = require('mkdirp');
const path   = require('path');
const ejs    = require('ejs');

module.exports = {
  base64ToImg,
  renderFile,
  saveFile
};

function base64ToImg(imgData, filePath) {
  var base64Data = imgData.replace(/^data:image\/\w+;base64,/, '');
  var dataBuffer = new Buffer(base64Data, 'base64');
  var fileDir    = path.dirname(filePath);
  mkdirp(fileDir, (err) => {
    fs.writeFile(filePath, dataBuffer, (err) => {
    });
  });
}

function renderFile(filePath, data, callback) {
  var rootPath = path.join(__dirname, '../views/');
  fs.readFile(rootPath + filePath, {flag: 'r+', encoding: 'utf8'}, function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    let html = ejs.render(result, data);
    callback(html);
  });
}

function saveFile(filePath, data, callback) {
  var rootPath = path.join(__dirname, '../public/pages/');
  mkdirp(rootPath, (err) => {
    fs.writeFile(rootPath + filePath, data, function (err) {
      if (err) {
        console.error(err);
      } else {
        callback()
      }
    });
  })
}
