const validateTransaction = (req, _res, next) => {
  const { amount } = req.body;
  if (!amount) {
    const error = { status: 400, message: 'Favor informar o campo amount.' };
    throw error;
  }

  if (amount <= 0) {
    const error = { status: 400, message: 'O campo amount deve ser maior que zero.' };
    throw error;
  }

  if (typeof amount !== 'number') {
    const error = { status: 400, message: 'O campo amount deve ser um número.' };
    throw error;
  }

  next();
};

module.exports = validateTransaction;
