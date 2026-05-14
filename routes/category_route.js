const express = require('express');
const router = express.Router();
const {getCategories} = require('../services/category_service');

router.get('/', getCategories);

module.exports = router;