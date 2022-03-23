const express = require('express');
const router = express.Router();

const sectionCtrl = require('../../controllers/sections.controller');

router.get('/', sectionCtrl.getAllSection);
router.put('/:id/update', sectionCtrl.updateSection);
module.exports = router;
