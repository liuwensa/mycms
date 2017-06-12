/**
 * Created by admin on 2017/6/12.
 */

'use strict';

const express = require('express');

const userCtr      = require('../../controllers/adminUser');
const categoryCtrl = require('../../controllers/category');
const contentCtrl  = require('../../controllers/content');
const tagsCtrl     = require('../../controllers/tags');

const router = express.Router();

router.route('/users')
  .get(userCtr.getAdminUsers)
  .post(userCtr.addAdminUser);

router.route('/users/:id')
  .get(userCtr.getAdminUserDtl)
  .put(userCtr.updateAdminUser)
  .delete(userCtr.delAdminUser);

router.route('/category')
  .get(categoryCtrl.getCategory)
  .post(categoryCtrl.addCategory);

router.route('/category/:id')
  .put(categoryCtrl.updateCategory)
  .delete(categoryCtrl.delCategory);

router.route('/content')
  .get(contentCtrl.getContents)
  .post(contentCtrl.addContent);

router.route('/content/:id')
  .get(contentCtrl.getContentDetail)
  .put(contentCtrl.updateContent)
  .delete(contentCtrl.delContent);

router.route('/tags')
  .get(tagsCtrl.getTags)
  .post(tagsCtrl.addTags);

router.route('/tags/:id')
  .put(tagsCtrl.updateTag)
  .delete(tagsCtrl.delTag);

module.exports = router;