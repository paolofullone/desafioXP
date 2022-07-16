const express = require('express');

const router = express.Router();

const stocksController = require('../controllers/stocksController');

router.get('/', stocksController.getAll);

module.exports = router;
