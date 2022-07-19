const usersServices = require('../services/usersServices');

const getAll = async (_req, res) => {
  const { email } = res.user;
  const clients = await usersServices.getAll(email);
  return res.status(200).json(clients);
};

const getBallance = async (req, res) => {
  const { email } = res.user;
  const ballance = await usersServices.getBallance(email);
  return res.status(200).json({ message: `Saldo atual ${ballance.toLocaleString('pt-BR')}.` });
};

const transaction = async (req, res) => {
  const { email } = res.user;
  const { amount } = req.body;
  const route = req.route.path;
  const ballance = await usersServices.transaction(email, amount, route);
  return res.status(201).json({ message: `Movimentação realizada com sucesso. Saldo atual ${ballance}.` });
};

const create = async (req, res) => {
  const user = req.body;
  const { email } = res.user;
  const newUser = await usersServices.create(user, email);
  return res.status(201).json(newUser);
};

module.exports = {
  getAll, transaction, getBallance, create,
};
