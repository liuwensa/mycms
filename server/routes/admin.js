'use strict';

const express = require('express');

const adminUserCtrl = require('../controllers/adminUser');
const adminCtrl = require('../controllers/admin');

const router = express.Router();

router.get('/', function (req, res) {
  return res.render('index.html');
});

router.get('/vnum', adminUserCtrl.verificationCode);
router.get('/logout', adminUserCtrl.logout);

router.post('/upload/images', adminCtrl.uploadImage);
router.post('/ueditor/upload/image', adminCtrl.uploadUeditorImage);
router.post('/ueditor/download/image', adminCtrl.remoteUeditorImage);

module.exports = router;
