const express = require('express');

const router = express.Router();

const stocksController = require('../controllers/stocksController');
const validateAuth = require('../middleware/validateAuth');
const validateNewStock = require('../middleware/validateNewStock');
const validateAdmin = require('../middleware/validateAdmin');

router.use(validateAuth);
router.get('/', validateAdmin, stocksController.getAll);
router.post('/', validateAdmin, validateNewStock, stocksController.create);
router.get('/:id', stocksController.getById);

module.exports = router;
