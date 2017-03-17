/**
 * Created by admin on 2017/3/17.
 */

'use strict';

const express = require('express');

const userCtr = require('../controllers/adminUser');

const router = express.Router();

router.route('/users')
  .get(userCtr.getAdminUsers)
  .post(userCtr.addAdminUser);

router.route('/users/:id')
  .put(userCtr.updateAdminUser)
  .delete(userCtr.delAdminUser);

module.exports = router;
