/**
 * Created by admin on 2017/3/31.
 */

'use strict';

const express = require('express');

const contentCtrl = require('../controllers/content');

const router = express.Router();

router.route('/content')
  .get(contentCtrl.getContents)
  .post(contentCtrl.addContent);

router.route('/content/:id')
  .get(contentCtrl.getContentDetail)
  .put(contentCtrl.updateContent)
  .delete(contentCtrl.delContent);

module.exports = router;
