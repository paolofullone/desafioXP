const express = require('express');

const router = express.Router();

const usersController = require('../controllers/usersController');
const validateAuth = require('../middleware/validateAuth');
const validateWithdraw = require('../middleware/validateWithdraw');

router.use(validateAuth);
router.get('/', usersController.getAll);
router.post('/deposit', usersController.transaction);
router.post('/withdraw', validateWithdraw, usersController.transaction);
router.get('/ballance', usersController.getBallance);

module.exports = router;
