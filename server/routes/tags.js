/**
 * Created by admin on 2017/3/17.
 */

'use strict';

const express = require('express');

const tagsCtrl = require('../controllers/tags');

const router = express.Router();

router.route('/tags')
  .get(tagsCtrl.getTags)
  .post(tagsCtrl.addContentTags);

router.route('/tags/:id')
  .put(tagsCtrl.updateContentTag)
  .delete(tagsCtrl.delContentTag);

module.exports = router;
