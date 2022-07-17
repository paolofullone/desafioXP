const express = require('express');

const router = express.Router();

const stocksOpsController = require('../controllers/stocksOpsController');
const validateAuth = require('../middleware/validateAuth');
const validateStocks = require('../middleware/validateStocks');
const validateBallance = require('../middleware/vallidateBallance');

router.get('/', validateAuth, stocksOpsController.getAll);
router.post('/purchase', validateAuth, validateStocks, validateBallance, stocksOpsController.create);
router.post('/sell', validateAuth, stocksOpsController.create);

module.exports = router;
