const usersModel = require('../models/usersModel');
const xpError = require('../utils/error');

const validateWithdraw = async (req, res, next) => {
  const user = await usersModel.getByEmail(res.user.email);
  const { ballance } = user[0];
  const withdraw = req.body.amount;
  if (withdraw > ballance) {
    throw xpError(400, `Saldo ${ballance} é menor que a retirada de ${withdraw} solicitada.`);
  }
  next();
};

module.exports = validateWithdraw;
