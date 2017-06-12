/**
 * Created by admin on 2017/6/12.
 */

'use strict';

const express = require('express');

const adminUserCtrl = require('../../controllers/adminUser');
const adminCtrl     = require('../../controllers/admin');

const router = express.Router();

router.get('/', function (req, res) {
  if (req.session && req.session.userInfo) {
    res.locals.userInfo = req.session.userInfo;
    return res.render('index.html');
  } else {
    return res.render('login.html');
  }
});

router.post('/login', adminUserCtrl.login);
router.get('/vnum', adminUserCtrl.verificationCode);
router.get('/logout', adminUserCtrl.logout);

router.post('/upload/images', adminCtrl.uploadImage);
router.post('/ueditor/upload/image', adminCtrl.uploadUeditorImage);
router.post('/ueditor/download/image', adminCtrl.remoteUeditorImage);

module.exports = router;