const express = require('express');

const router = express.Router();

const stocksOpsController = require('../controllers/stocksOpsController');

router.get('/', stocksOpsController.getAll);

module.exports = router;
