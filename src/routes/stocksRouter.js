const express = require('express');

const router = express.Router();

const stocksController = require('../controllers/stocksController');
const validateAuth = require('../middleware/validateAuth');
const validateNewStock = require('../middleware/validateNewStock');

router.use(validateAuth);
router.get('/', stocksController.getAll);
router.post('/', validateNewStock, stocksController.create);
router.get('/:id', stocksController.getById);

module.exports = router;
