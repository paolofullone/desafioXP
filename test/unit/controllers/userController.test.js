/* eslint-disable no-unused-expressions */
const sinon = require('sinon');
const chai = require('chai');

const { expect } = chai;
chai.use(require('chai-as-promised'));

const {
  describe, it, beforeEach, afterEach,
} = require('mocha');

// const connection = require('../../../src/db/connection');
const usersController = require('../../../src/controllers/usersController');
const usersService = require('../../../src/services/usersServices');

const { users, user } = require('../../mocks');

describe('Testes da camada de controller dos usuários', () => {
  describe('Teste do método getAll', () => {
    beforeEach(async () => {
      sinon.stub(usersService, 'getAll').resolves([users]);
    });

    afterEach(() => {
      usersService.getAll.restore();
    });

    it('Deve retornar um array de usuários', async () => {
      const [usersReturned] = await usersService.getAll();
      expect(usersReturned).to.be.an('array');
      expect(usersReturned).to.have.lengthOf(3);
    });
  });
  describe('Teste do método getBallance', () => {
    const req = {};
    const res = { user: users[0] };
    beforeEach(async () => {
      sinon.stub(usersService, 'getBallance').resolves(100000.00);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });
    afterEach(() => {
      usersService.getBallance.restore();
    });
    it('Deve retornar o saldo conforme esperado', async () => {
      const ballance = await usersService.getBallance(req, res.user.email);
      expect(ballance).to.be.equal(100000.00);
      await usersController.getBallance(req, res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ message: `Saldo atual ${ballance}.` })).to.be.true;
    });
  });
  describe('Teste do método transaction', () => {
    const res = { user: users[0] };
    const req = { body: { amount: 100000 }, route: { path: '/deposit' } };

    beforeEach(async () => {
      sinon.stub(usersService, 'transaction').resolves(600000.00);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });
    afterEach(() => {
      usersService.transaction.restore();
    });
    it('Deve retornar o novo saldo conforme esperado', async () => {
      const ballance = await usersService
        .transaction(res.user.email, req.body.amount, req.route.path);
      expect(ballance).to.be.equal(600000.00);
    });
  });
  describe('Teste do método create', () => {
    const inputUser = {
      email: 'paolo@xpinc.com',
      password: '123456',
      userName: 'Paolo',
      ballance: '100000.00',
    };

    const res = { user: users[0] };
    const req = { body: { user: inputUser } };

    beforeEach(async () => {
      sinon.stub(usersService, 'create').resolves([user]);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });
    afterEach(() => {
      usersService.create.restore();
    });
    it('Deve retornar o user criado', async () => {
      const [newUser] = await usersService.create(req.body.user, res.user.email);
      expect(newUser).to.be.an('array');
      expect(newUser).to.have.lengthOf(1);
      expect(newUser[0].email).to.be.equal(inputUser.email);
      expect(newUser[0].password).to.be.equal(inputUser.password);
      expect(newUser[0].user_name).to.be.equal(inputUser.userName);
      expect(newUser[0].ballance).to.be.equal(inputUser.ballance);
    });
  });
});
