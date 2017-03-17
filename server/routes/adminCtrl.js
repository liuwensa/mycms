/**
 * Created by Administrator on 2016/1/16.
 * 权限控制层
 * 对权限和参数做初次过滤
 */

'use strict';

const express   = require('express');
const url       = require('url');
const shortid   = require('shortid');

const router = express.Router();

router.caseSensitive = true;

// 站点配置
const settings  = require('../models/db/settings');
const adminFunc = require('../models/db/adminFunc');

const sysMsg = config.sysMsg;

function isAdminLogined(req) {
  return req.session.adminlogined;
}

router.get('/', function (req, res, next) {
  if (isAdminLogined(req)) {
    res.redirect('/admin/manage');
  } else {
    next();
  }
});

//管理员主页
router.get(['/manage', '/manage/*'], function (req, res, next) {
  if (isAdminLogined(req)) {
    next();
  } else {
    res.redirect('/admin');
  }
});

//模块管理页面
router.get('/manage/:targetPage', function (req, res, next) {
  var currentPage = req.params.targetPage;
  if (settings[currentPage]) {
    if (!adminFunc.checkAdminPower(req, settings[currentPage][0] + '_view')) {
      res.render('manage/public/notice', adminFunc.setDataForInfo('danger', '对不起，您无权操作 <strong>' + settings[currentPage][1] + '</strong> 模块！'));
    } else {
      next();
    }
  } else {
    next();
  }
});

//通用对象列表数据查询
router.get('/manage/getDocumentList/:defaultUrl', function (req, res, next) {
  var currentPage = req.params.defaultUrl;
  if (adminFunc.checkAdminPower(req, currentPage + '_view')) {
    next();
  } else {
    return res.json({});
  }
});

//获取单个对象数据
router.get('/manage/:defaultUrl/item', function (req, res, next) {
  var currentPage = req.params.defaultUrl;
  var params      = url.parse(req.url, true);
  var targetId    = params.query.uid;
  if (adminFunc.checkAdminPower(req, currentPage + '_view')) {
    if (shortid.isValid(targetId)) {
      next();
    } else {
      res.end(sysMsg.systemIllegalParam);
    }
  } else {
    return res.json({});
  }
});

//对象新增
router.post('/manage/:defaultUrl/addOne', function (req, res, next) {
  var currentPage = req.params.defaultUrl;
  if (adminFunc.checkAdminPower(req, currentPage + '_add')) {
    next();
  } else {
    res.end(sysMsg.systemNoPower);
  }
});

//更新单条记录(执行更新)
router.post('/manage/:defaultUrl/modify', function (req, res, next) {
  var currentPage = req.params.defaultUrl;
  var params      = url.parse(req.url, true);
  var targetId    = params.query.uid;
  if (adminFunc.checkAdminPower(req, currentPage + '_modify')) {
    if (shortid.isValid(targetId)) {
      next();
    } else {
      res.end(sysMsg.systemIllegalParam);
    }
  } else {
    res.end(sysMsg.systemNoPower);
  }
});

//通用对象删除
router.get('/manage/:defaultUrl/del', function (req, res, next) {
  var currentPage = req.params.defaultUrl;
  var params      = url.parse(req.url, true);
  var targetId    = params.query.uid;
  if (adminFunc.checkAdminPower(req, currentPage + '_del')) {
    if (shortid.isValid(targetId)) {
      next();
    } else {
      res.end(sysMsg.systemIllegalParam);
    }
  } else {
    res.end(sysMsg.systemNoPower);
  }
});

//批量删除对象
router.get('/manage/:defaultUrl/batchDel', function (req, res, next) {
  var currentPage = req.params.defaultUrl;
  var params      = url.parse(req.url, true);
  var ids         = params.query.ids;
  var idsArr      = ids.split(',');
  if (adminFunc.checkAdminPower(req, currentPage + '_del')) {
    if (idsArr.length > 0) {
      next();
    } else {
      res.end(sysMsg.systemIllegalParam);
    }
  } else {
    res.end(sysMsg.systemNoPower);
  }
});

//访问指定对象的数据列表(不带分页)
router.get('/manage/:modular/list', function (req, res, next) {
  var currentPage = req.params.modular;
  if (settings[currentPage]) {
    if (!adminFunc.checkAdminPower(req, settings[currentPage][0] + '_view')) {
      return res.json({});
    } else {
      next();
    }
  } else {
    next();
  }
});

module.exports = router;
