const express = require('express');

const router = express.Router();

const validateLogin = require('../middleware/validateLogin');
const loginController = require('../controllers/loginController');

router.post('/', validateLogin, loginController.login);

module.exports = router;
