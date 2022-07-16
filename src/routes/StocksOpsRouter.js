const express = require('express');

const router = express.Router();

const stocksOpsController = require('../controllers/stocksOpsController');
const validateAuth = require('../middleware/validateAuth');
const validatePurchase = require('../middleware/validatePurchase');

router.get('/', validateAuth, stocksOpsController.getAll);
router.post('/purchase', validateAuth, validatePurchase, stocksOpsController.create);
router.post('/sell', validateAuth, stocksOpsController.create);

module.exports = router;
