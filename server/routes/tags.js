/**
 * Created by admin on 2017/3/17.
 */

'use strict';

const express = require('express');

const tagsCtrl = require('../controllers/tags');

const router = express.Router();

router.route('/tags')
  .get(tagsCtrl.getTags)
  .post(tagsCtrl.addTags);

router.route('/tags/:id')
  .put(tagsCtrl.updateTag)
  .delete(tagsCtrl.delTag);

module.exports = router;
