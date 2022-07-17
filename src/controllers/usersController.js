const usersServices = require('../services/usersServices');

const getAll = async (_req, res) => {
  const clients = await usersServices.getAll();
  return res.status(200).json(clients);
};

const getBallance = async (req, res) => {
  const { email } = res.user;
  const ballance = await usersServices.getBallance(email);
  return res.status(200).json({ message: `Saldo atual ${ballance}.` });
};

const transaction = async (req, res) => {
  const { email } = res.user;
  const { amount } = req.body;
  const route = req.route.path;
  const ballance = await usersServices.transaction(email, amount, route);
  return res.status(201).json({ message: `Movimentação realizada com sucesso. Saldo atual ${ballance}.` });
};

module.exports = { getAll, transaction, getBallance };
