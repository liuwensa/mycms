'use strict';

const express = require('express');

const adminUserCtr = require('../controllers/adminUser');

const router = express.Router();

router.get('/', function (req, res) {
  return res.render('index.html');
});

router.get('/vnum', adminUserCtr.verificationCode);
router.get('/logout', adminUserCtr.logout);

module.exports = router;
