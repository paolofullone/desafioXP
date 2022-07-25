const xpError = require('../utils/error');

const validateNewStock = async (req, _res, next) => {
  const {
    name, ticker, value, availableQuantity,
  } = req.body;
  if (!name || !ticker || !value || !availableQuantity) {
    throw xpError(400, 'Favor informar nome, preço e quantidade corretamente.');
  }
  if (availableQuantity < 0) {
    throw xpError(400, 'Quantidade disponível não pode ser negativa.');
  }
  if (name.length < 3) {
    throw xpError(400, 'Nome deve possuir no mínimo 3 caracteres.');
  }
  if (value < 0) {
    throw xpError(400, 'Valor da ação não pode ser negativo.');
  }
  next();
};

module.exports = validateNewStock;
