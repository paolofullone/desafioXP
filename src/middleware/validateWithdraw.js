const usersModel = require('../models/usersModel');

const validateWithdraw = async (req, res, next) => {
  const user = await usersModel.getByEmail(res.user.email);
  const { ballance } = user[0];
  const withdraw = req.body.amount;
  if (withdraw > ballance) {
    const error = { status: 400, message: `Saldo ${ballance} é menor que a retirada de ${withdraw} solicitada.` };
    throw error;
  }
  next();
};

module.exports = validateWithdraw;
