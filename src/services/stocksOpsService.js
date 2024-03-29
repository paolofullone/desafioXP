const { v4: uuidv4 } = require('uuid');
const { userWallet } = require('../utils/userWallet');

const stocksOpsModel = require('../models/stocksOpsModel');
const stocksModel = require('../models/stocksModel');
const usersModel = require('../models/usersModel');
const xpError = require('../utils/error');

const getAll = async () => stocksOpsModel.getAll();

const getWalletByUserId = async (userId) => {
  const user = await usersModel.getById(userId);
  if (!user.length) throw xpError(404, 'Usuário não encontrado');
  const stocksOps = await stocksOpsModel.getWalletByUserId(userId);
  return userWallet(stocksOps);
};

const createOperations = (requestedOperations, userId, route) => {
  requestedOperations.forEach(async (operation) => {
    const stockPrice = await stocksModel.getById(operation.stockId);
    const newOperation = { ...operation, stockPrice };
    const opId = uuidv4();
    await stocksOpsModel.create(opId, userId, newOperation, route);
  });
};

const updateStocks = async (requestedOperations, route) => {
  requestedOperations.forEach(async (operation) => {
    await stocksModel.update(operation, route);
  });
};

const create = async (userId, requestedOperations, route) => {
  createOperations(requestedOperations, userId, route);
  updateStocks(requestedOperations, route);
  try {
    await usersModel.updateBallance(userId, route, requestedOperations);
  } catch (error) {
    throw xpError(error.status || 500, 'Não foi possível processar as operações, tente novamente mais tarde');
  }
  return requestedOperations;
};

module.exports = { getAll, create, getWalletByUserId };
