const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();

const clientsController = require('../controllers/clientsController');

router.get('/', clientsController.getAll);

module.exports = router;
