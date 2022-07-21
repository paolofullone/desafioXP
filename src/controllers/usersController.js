const usersServices = require('../services/usersServices');

const getAll = async (_req, res) => {
  const { email } = res.user;
  const clients = await usersServices.getAll(email);
  return res.status(200).json(clients);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const client = await usersServices.getById(id);
  return res.status(200).json(client);
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

const deleteUser = async (req, res) => {
  const { id } = req.params;
  await usersServices.deleteUser(id);
  return res.status(200).json({ message: 'usuário excluído com sucesso.' });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = req.body;
  const updatedUser = await usersServices.updateUser(id, user);
  return res.status(200).json(updatedUser);
};

module.exports = {
  getAll, getById, transaction, getBallance, create, deleteUser, updateUser,
};
