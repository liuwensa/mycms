/**
 * Created by admin on 2017/6/12.
 */

'use strict';

const express = require('express');

const adminCtrl = require('../../controllers/admin');

const router = express.Router();

router.get('/', function (req, res) {
  if (req.session && req.session.userInfo) {
    res.locals.userInfo = req.session.userInfo;
    return res.render('index.html');
  } else {
    return res.render('login.html');
  }
});

router.post('/login', adminCtrl.login);
router.get('/vnum', adminCtrl.verificationCode);
router.get('/logout', adminCtrl.logout);

router.post('/upload/images', adminCtrl.uploadImage);
router.post('/ueditor/upload/image', adminCtrl.uploadUeditorImage);
router.post('/ueditor/download/image', adminCtrl.remoteUeditorImage);

module.exports = router;