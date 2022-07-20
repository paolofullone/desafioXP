const express = require('express');

const router = express.Router();

const usersController = require('../controllers/usersController');
const validateAuth = require('../middleware/validateAuth');
const validateWithdraw = require('../middleware/validateWithdraw');
const validateNewUser = require('../middleware/validateNewUser');
const validateTransaction = require('../middleware/ValidateTransaction');

router.use(validateAuth);
router.get('/', usersController.getAll);
router.post('/', validateNewUser, usersController.create);
router.post('/deposit', validateTransaction, usersController.transaction);
router.post('/withdraw', validateTransaction, validateWithdraw, usersController.transaction);
router.get('/ballance', usersController.getBallance);

module.exports = router;
