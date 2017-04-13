/**
 * Created by admin on 2017/4/13.
 */

'use strict';

const request = require('request');
const rp      = require('request-promise');

module.exports = {
  uploadImage,
  uploadUeditorImage,
  remoteUeditorImage
};

function uploadImage(req, res) {
  const url = `${config.imageUrl}/upload/images`;
  pipToImageServe(url, req, res);
}

function uploadUeditorImage(req, res) {
  const url = `${config.imageUrl}/ueditor/upload/image`;
  pipToImageServe(url, req, res);
}

function remoteUeditorImage(req, res) {
  let urls = req.body['source[]'] || req.body.source || [];

  if (!Array.isArray(urls)) {
    urls = [urls];
  }

  return rp.post({
    uri : `${config.imageUrl}/ueditor/download/image`,
    body: {
      urls: urls
    },
    json: true
  }).then((ret) => {
    return res.json(ret);
  }).catch((err) => {
    return res.json({state: 'FAILED', tip: '远程图片抓取失败', list: []});
  });
}

function pipToImageServe(url, req, res) {
  if (req.method === 'POST') {
    const thePiper = request.post({url: url, timeout: 1000 * 600});
    req.pipe(thePiper);
    thePiper.pipe(res);
  } else {
    return res.end();
  }
}