const express = require('express');

const router = express.Router();

const stocksOpsController = require('../controllers/stocksOpsController');
const validateAuth = require('../middleware/validateAuth');

router.get('/', validateAuth, stocksOpsController.getAll);
router.post('/purchase', validateAuth, stocksOpsController.create);

module.exports = router;
