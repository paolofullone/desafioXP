const { v4: uuidv4 } = require('uuid');
const { userWallet } = require('../utils/userWallet');

const stocksOpsModel = require('../models/stocksOpsModel');
const stocksModel = require('../models/stocksModel');
const usersModel = require('../models/usersModel');

const getAll = async () => {
  const stocksOps = await stocksOpsModel.getAll();
  return stocksOps;
};

const getWalletByUserId = async (userId) => {
  const stocksOps = await stocksOpsModel.getWalletByUserId(userId);
  const wallet = userWallet(stocksOps);
  return wallet;
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
  await usersModel.updateBallance(userId, route, requestedOperations);
  return requestedOperations;
};

module.exports = { getAll, create, getWalletByUserId };
