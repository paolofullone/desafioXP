const sinon = require('sinon');
const chai = require('chai');

const { v4: uuidv4 } = require('uuid');

const { expect } = chai;
chai.use(require('chai-as-promised'));

const {
  describe, it, beforeEach, afterEach,
} = require('mocha');

const connection = require('../../../src/db/connection');
const usersModel = require('../../../src/models/usersModel');
const usersService = require('../../../src/services/usersServices');
// const validateAdmin = require('../../../src/middleware/validateAdmin');

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
  describe('Teste do método create', () => {
    const inputUser = {
      email: 'paolo.enrico@gmail.com',
      password: 123456,
      userName: 'Paolo',
      ballance: 65478,
    };
    // email, password, userName, ballance,
    beforeEach(async () => {
      sinon.stub(usersModel, 'create').resolves([user]);
      // sinon.stub(validateAdmin).resolves(true);
      // sinon.stub(uuidv4).resolves('cabfd67e-15e9-4e08-a8ad-0c65f5ed717a');
    });
    afterEach(() => {
      // connection.execute.restore();
      usersModel.create.restore();
      // validateAdmin.restore();
      // uuidv4.restore();
    });
    it('Deve retornar o user criado', async () => {
      const userId = uuidv4();
      const [newUser] = await usersModel.create(userId, inputUser);
      expect(newUser).to.be.an('array');
      expect(newUser[0].user_name).to.be.equal('Paolo');
      expect(newUser[0].email).to.be.equal('paolo@xpinc.com');
    });
  });
});
