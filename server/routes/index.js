'use strict';

const express   = require('express');
const shortid   = require('shortid');

const router = express.Router();

// const siteFunc = require('../models/db/siteFunc');
// const content  = require('../services/content');

router.get('/', function (req, res, next) {
  // console.log('=============')
  return res.render('index.html');
  // siteFunc.renderToTargetPageByType(req, res, 'index');
});

//缓存站点地图
router.get('/sitemap.html', function (req, res, next) {
  const options = {
    type : 'content',
    state: true
  };

  return res.json(content.getContents(options))
  // return content.getContents(options).then((docs) => {
  //   return res.json(docs)
  // })
  // return content.getContents(options)
  //   .then((docs) => siteFunc.renderToTargetPageByType(req, res, 'sitemap', {docs: docs}))
  //   .catch((err) => res.end(err));
});

//文档详情页面
router.get('/details/:url.html', function (req, res, next) {
  const currentId = req.params.url;

  if (!shortid.isValid(currentId)) {
    return handleError(req, res, 'do404');
  }

  return content.getContentDetail({
    '_id'  : currentId,
    'state': true
  })
    .then((result) => {
      result.clickNum  = result.clickNum + 1;
      var cateParentId = result.sortPath.split(',')[1];
      var cateQuery    = {'sortPath': {$regex: new RegExp(cateParentId, 'i')}};
      return result.save().then(() => {
        return content.getContentsCount(cateQuery)
          .then((count) => {
            // return res.json(result)
            return siteFunc.renderToTargetPageByType(req, res, 'detail', {
              count    : count,
              cateQuery: cateQuery,
              detail   : result
            });
          });
      });
    })
    .catch(() => handleError(req, res, 'do404'));
});

//分类列表页面  http://127.0.0.1/DoraCms___VylIn1IU-1.html
router.get('/:defaultUrl', function (req, res, next) {

  var defaultUrl = req.params.defaultUrl;
  var url        = defaultUrl.split('___')[1];
  var indexUrl   = defaultUrl.split('—')[0];
  if (indexUrl == 'page') { // 首页的分页
    var indexPage = defaultUrl.split('—')[1].split(".")[0];
    if (indexPage && utils.validator.isNumeric(indexPage)) {
      req.query.page = indexPage;
    }
    siteFunc.renderToTargetPageByType(req, res, 'index');
  } else {
    var currentUrl = url;
    if (url) {
      if (url.indexOf("—") >= 0) {
        currentUrl     = url.split("—")[0];
        var catePageNo = (url.split("—")[1]).split(".")[0];
        if (catePageNo && utils.validator.isNumeric(catePageNo)) {
          req.query.page = catePageNo;
        }
      }
      queryCatePage(req, res, currentUrl);
    } else {
      next();
    }
  }
});

//分类列表页面  http://127.0.0.1/front-development/AngluarJs___EyW7kj6w
router.get('/:forder/:defaultUrl', function (req, res, next) {

  var defaultUrl = req.params.defaultUrl;
  var url        = defaultUrl.split('___')[1];
  var currentUrl = url;
  if (url) {
    if (url.indexOf("—") >= 0) {
      currentUrl     = url.split("—")[0];
      var catePageNo = (url.split("—")[1]).split(".")[0];
      if (catePageNo && utils.validator.isNumeric(catePageNo)) {
        req.query.page = catePageNo;
      }
    }
    queryCatePage(req, res, currentUrl);
  } else {
    next();
  }


});

//分类页面路由设置
function queryCatePage(req, res, cateId) {

  if (shortid.isValid(cateId)) {
    db.ContentCategory.findOne({"_id": cateId}).populate('contentTemp').exec(function (err, result) {
      if (err) {
        siteFunc.renderToTargetPageByType(req, res, 'error', {info: '页面未找到!', message: err.message, page: 'do500'});
      } else {
        if (result) {
          var contentQuery = {'sortPath': {$regex: new RegExp(result._id, 'i')}, 'state': true};
          var cateParentId = result.sortPath.split(',')[1];
          var cateQuery    = {'sortPath': {$regex: new RegExp(cateParentId, 'i')}};

          siteFunc.renderToTargetPageByType(req, res, 'contentList', {
            contentQuery: contentQuery,
            cateQuery   : cateQuery,
            result      : result
          });
        }
        else {
          siteFunc.renderToTargetPageByType(req, res, 'error', {
            info   : '非法操作!',
            message: config.systemIllegalParam,
            page   : 'do500'
          });
        }
      }
    });
  } else {
    siteFunc.renderToTargetPageByType(req, res, 'error', {
      info   : '非法操作!',
      message: config.systemIllegalParam,
      page   : 'do500'
    });
  }

}

/**
 * 错误返回页面处理
 * @param {Object} req
 * @param {Object} res
 * @param {string} page
 */
function handleError(req, res, page) {
  page = page || 'do404';
  siteFunc.renderToTargetPageByType(req, res, 'error', {
    info   : '非法操作!',
    message: config.systemIllegalParam,
    // do500,do404
    page   : page
  });
}

module.exports = router;
