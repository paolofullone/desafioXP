const xpError = require('../utils/error');

const validateTransaction = (req, _res, next) => {
  const { amount } = req.body;
  if (!amount) {
    throw xpError(400, 'Favor informar o campo amount.');
  }

  if (amount <= 0) {
    throw xpError(400, 'O campo amount deve ser maior que zero.');
  }

  if (typeof amount !== 'number') {
    throw xpError(400, 'O campo amount deve ser um número.');
  }

  next();
};

module.exports = validateTransaction;
