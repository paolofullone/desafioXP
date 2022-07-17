/* eslint-disable no-console */
const usersModel = require('../models/usersModel');
const stocksModel = require('../models/stocksModel');

const getAllStocks = (operations) => {
  const promises = operations.map(async (operation) => {
    const stock = await stocksModel.getById(operation.stockId);
    return stock[0];
  });
  return Promise.all(promises);
};

const verifyBallance = (operations, stocks, ballance) => {
  console.log('operations', operations);
  console.log('stocks', stocks);
  console.log('ballance', +ballance);
  const totalCost = operations.map((operation) => {
    const stock = stocks.find((s) => s.stock_id === operation.stockId);
    return operation.quantity * (+stock.value);
  }).reduce((acc, curr) => acc + curr, 0);
  console.log('totalCost', totalCost);
  if (+ballance < totalCost) {
    const error = { status: 400, message: 'Saldo insuficiente para a operação solicitada.' };
    throw error;
  }
};

const validateBallance = async (req, res, next) => {
  const [user] = await usersModel.getByEmail(res.user.email);
  const operations = req.body;
  const stocks = await getAllStocks(operations);
  verifyBallance(operations, stocks, user.ballance);
  next();
};

module.exports = validateBallance;
