const sinon = require('sinon');
const chai = require('chai');

const { expect } = chai;
chai.use(require('chai-as-promised'));

const {
  describe, it, beforeEach, afterEach,
} = require('mocha');

const connection = require('../../../src/db/connection');
const usersModel = require('../../../src/models/usersModel');
const usersService = require('../../../src/services/usersServices');

const { users, user } = require('../../mocks');

describe('Testes da camada de service dos usuários', () => {
  describe('Teste do método getAll', () => {
    beforeEach(async () => {
      sinon.stub(connection, 'execute').resolves([users]);
    });

    afterEach(() => {
      connection.execute.restore();
    });

    it('Deve retornar um array de usuários', async () => {
      const usersReturned = await usersModel.getAll();
      expect(usersReturned).to.be.an('array');
      expect(usersReturned).to.have.lengthOf(3);
    });
    it('Deve retornar o primeiro usuário como esperado', async () => {
      const usersReturned = await usersModel.getAll();
      expect(usersReturned).to.be.an('array');
      expect(usersReturned[0].user_name).to.be.equal('Luca');
      expect(usersReturned[0].email).to.be.equal('luca@xpinc.com');
    });
  });
  describe('Teste do método getByEmailAndPassword', () => {
    beforeEach(async () => {
      sinon.stub(connection, 'execute').resolves([user]);
    });
    afterEach(() => {
      connection.execute.restore();
    });
    it('Deve retornar um usuário conforme esperado', async () => {
      const userFound = await usersModel.getByEmailAndPassword('paolo@xpinc.com', '123456');
      expect(userFound).to.be.an('array');
      expect(userFound).to.have.lengthOf(1);
      expect(userFound[0].user_name).to.be.equal('Paolo');
      expect(userFound[0].email).to.be.equal('paolo@xpinc.com');
      expect(userFound[0].email).not.to.be.equal('luca@xpinc.com');
    });
  });

  describe('Teste do método getBallance', () => {
    beforeEach(async () => {
      sinon.stub(connection, 'execute').resolves([user]);
    });
    afterEach(() => {
      connection.execute.restore();
    });
    it('Deve retornar um saldo conform esperado', async () => {
      const userFound = await usersService.getBallance('paolo@xpinc.com');
      expect(+userFound).to.be.an('number');
      expect(+userFound).to.be.equal(100000.00);
    });
  });
  describe('Teste do método transaction', () => {
    beforeEach(async () => {
      sinon.stub(connection, 'execute').resolves('200000.00');
    });
    afterEach(() => {
      connection.execute.restore();
    });
    it('Deve retornar o saldo atualizado', async () => {
      const ballance = await usersService.transaction('paolo@xpinc.com', 100000, '/deposit');
      expect(+ballance).to.be.an('number');
    });
  });
});
