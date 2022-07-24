const validateNewStock = async (req, _res, next) => {
  const {
    name, ticker, value, availableQuantity,
  } = req.body;
  if (!name || !ticker || !value || !availableQuantity) {
    const error = { status: 400, message: 'Favor informar nome, preço e quantidade corretamente.' };
    throw error;
  }
  if (availableQuantity < 0) {
    const error = { status: 400, message: 'Quantidade disponível não pode ser negativa.' };
    throw error;
  }
  if (name.length < 3) {
    const error = { status: 400, message: 'Nome deve possuir no mínimo 3 caracteres.' };
    throw error;
  }
  if (value < 0) {
    const error = { status: 400, message: 'Valor da ação não pode ser negativo.' };
    throw error;
  }
  next();
};

module.exports = validateNewStock;
