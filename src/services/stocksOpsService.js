const { v4: uuidv4 } = require('uuid');
const { userWallet } = require('../utils/userWallet');

const stocksOpsModel = require('../models/stocksOpsModel');
const stocksModel = require('../models/stocksModel');
const usersModel = require('../models/usersModel');

const getAll = async (email) => {
  const stocksOps = await stocksOpsModel.getAll(email);
  return stocksOps;
};

const getByUserId = async (email) => {
  const stocksOps = await stocksOpsModel.getByUserId(email);
  console.log('stockops', stocksOps);
  const wallet = userWallet(stocksOps);
  return wallet;
};

const createOperations = (operations, userId, route) => {
  operations.forEach(async (operation) => {
    const opId = uuidv4();
    await stocksOpsModel.create(opId, userId[0].user_id, operation, route);
  });
};

const updateStocks = async (operations, route) => {
  operations.forEach(async (operation) => {
    await stocksModel.update(operation, route);
  });
};

const create = async (email, operations, route) => {
  const userId = await usersModel.getByEmail(email);
  createOperations(operations, userId, route);
  updateStocks(operations, route);
  await usersModel.updateBallance(userId[0].user_id, route, operations);
  return operations;
};

module.exports = { getAll, create, getByUserId };
