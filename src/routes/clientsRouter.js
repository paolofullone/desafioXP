const express = require('express');

const router = express.Router();

const clientsController = require('../controllers/clientsController');

router.get('/', clientsController.getAll);

module.exports = router;
