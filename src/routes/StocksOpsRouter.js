const express = require('express');

const router = express.Router();

const stocksOpsController = require('../controllers/stocksOpsController');
const validateAuth = require('../middleware/validateAuth');
const validateStocks = require('../middleware/validateStocks');
const validateSell = require('../middleware/validateSell');
const validateBallance = require('../middleware/validateBallance');
const validateUserSellStocks = require('../middleware/validateUserSellStocks');

router.get('/', validateAuth, stocksOpsController.getAll);
router.get('/:id', validateAuth, stocksOpsController.getByUser);
router.post('/purchase', validateAuth, validateStocks, validateBallance, stocksOpsController.create);
router.post('/sell', validateAuth, validateSell, validateUserSellStocks, stocksOpsController.create);

module.exports = router;
