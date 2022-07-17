const stocksOpsService = require('../services/stocksOpsService');

const getAll = async (req, res) => {
  const { email } = res.user;
  const stocks = await stocksOpsService.getAll(email);
  return res.status(200).json(stocks);
};

const getByUser = async (req, res) => {
  const wallet = await stocksOpsService.getByUser(res.user.email);
  return res.status(200).json(wallet);
};

const create = async (req, res) => {
  const { email } = res.user;
  const route = req.route.path;
  const requestedOperations = req.body;
  await stocksOpsService.create(email, requestedOperations, route);
  return res.status(201).json({ message: 'Operações cadastradas com sucesso.' });
};

module.exports = { getAll, create, getByUser };
