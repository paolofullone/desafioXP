const validateNewStock = async (req, res, next) => {
  const {
    name, ticker, value, availableQuantity,
  } = req.body;
  if (!name || !ticker || !value || !availableQuantity) {
    const error = { status: 400, message: 'Favor informar nome, preço e quantidade corretamente.' };
    throw error;
  }
  next();
};

module.exports = validateNewStock;
