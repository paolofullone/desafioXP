const { v4: uuidv4 } = require('uuid');
const { userWallet } = require('../utils/userWallet');

const stocksOpsModel = require('../models/stocksOpsModel');
const stocksModel = require('../models/stocksModel');
const usersModel = require('../models/usersModel');

const getAll = async (email) => {
  const stocksOps = await stocksOpsModel.getAll(email);
  return stocksOps;
};

const getByUser = async (email) => {
  const stocksOps = await stocksOpsModel.getByUser(email);
  const wallet = userWallet(stocksOps);
  return wallet;
};

const createOperations = (requestedOperations, userId, route) => {
  requestedOperations.forEach(async (operation) => {
    const opId = uuidv4();
    await stocksOpsModel.create(opId, userId[0].user_id, operation, route);
  });
};

const updateStocks = async (requestedOperations, route) => {
  requestedOperations.forEach(async (operation) => {
    await stocksModel.update(operation, route);
  });
};

const create = async (email, requestedOperations, route) => {
  const userId = await usersModel.getByEmail(email);
  createOperations(requestedOperations, userId, route);
  updateStocks(requestedOperations, route);
  await usersModel.updateBallance(userId[0].user_id, route, requestedOperations);
  return requestedOperations;
};

module.exports = { getAll, create, getByUser };
