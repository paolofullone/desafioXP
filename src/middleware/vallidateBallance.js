const usersModel = require('../models/usersModel');
const stocksModel = require('../models/stocksModel');
const { totalOperationValue } = require('../utils/totalOpValue');

const getAllStocks = (requestedOperations) => {
  const promises = requestedOperations.map(async (operation) => {
    const stock = await stocksModel.getById(operation.stockId);
    return stock[0];
  });
  return Promise.all(promises);
};

const verifyBallance = (requestedOperations, stocks, ballance) => {
  const totalOpValue = totalOperationValue(requestedOperations, stocks);
  if (+ballance < totalOpValue) {
    const error = { status: 400, message: 'Saldo insuficiente para a operação solicitada.' };
    throw error;
  }
};

const validateBallance = async (req, res, next) => {
  const [user] = await usersModel.getByEmail(res.user.email);
  const requestedOperations = req.body;
  const stocks = await getAllStocks(requestedOperations);
  verifyBallance(requestedOperations, stocks, user.ballance);
  next();
};

module.exports = validateBallance;
