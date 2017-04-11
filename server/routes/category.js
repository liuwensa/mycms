/**
 * Created by admin on 2017/3/17.
 */

'use strict';

const express = require('express');

const categoryCtrl = require('../controllers/category');

const router = express.Router();

router.route('/category')
  .get(categoryCtrl.getCategory)
  .post(categoryCtrl.addCategory);

router.route('/category/:id')
  .put(categoryCtrl.updateCategory)
  .delete(categoryCtrl.delCategory);

module.exports = router;
