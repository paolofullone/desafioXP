const stocksOpsService = require('../services/stocksOpsService');

const getAll = async (_req, res) => {
  const stocks = await stocksOpsService.getAll();
  return res.status(200).json(stocks);
};

const getByUserId = async (_req, res) => {
  const { userId } = res.user;
  const wallet = await stocksOpsService.getByUserId(userId);
  return res.status(200).json(wallet);
};

const create = async (req, res) => {
  const { userId } = res.user;
  const route = req.route.path;
  const requestedOperations = req.body;
  await stocksOpsService.create(userId, requestedOperations, route);
  return res.status(201).json({ message: 'Operações cadastradas com sucesso.' });
};

module.exports = { getAll, create, getByUserId };
