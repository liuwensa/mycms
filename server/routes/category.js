/**
 * Created by admin on 2017/3/17.
 */

'use strict';

const express = require('express');

const categoryCtrl = require('../controllers/category');

const router = express.Router();

router.route('/category')
  .get(categoryCtrl.getContentCategory)
  .post(categoryCtrl.addContentCategory);

router.route('/category/:id')
  .put(categoryCtrl.updateContentCategory)
  .delete(categoryCtrl.delContentCategory);

module.exports = router;
