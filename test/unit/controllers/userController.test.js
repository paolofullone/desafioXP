/* eslint-disable no-unused-expressions */
const sinon = require('sinon');
const chai = require('chai');

const { expect } = chai;
chai.use(require('chai-as-promised'));
chai.use(require('sinon-chai'));

// https://stackoverflow.com/questions/45314317/invalid-chai-property-when-calling-calledonce

const usersController = require('../../../src/controllers/usersController');
const usersService = require('../../../src/services/usersServices');

const { users, user } = require('../../mocks');

describe('Testes da camada de controller dos usuários: ', () => {
  describe('Teste do método getAll', () => {
    const req = {};
    const res = { user: { email: 'paolo@xpinc.com' } };
    beforeEach(async () => {
      sinon.stub(usersService, 'getAll').resolves(users);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => {
      usersService.getAll.restore();
    });

    it('Deve retornar um array de usuários.', async () => {
      await usersController.getAll(req, res);
      expect(res.status).to.be.calledWith(200);
      expect(res.json).to.be.calledWith(users);      
    });
  });

  describe('Teste do método getById.', () => {
    const req = { params: { id: 'cabfd67e-15e9-4e08-a8ad-0c65f5ed717a' } };
    const res = {  };
    beforeEach(async () => {
      sinon.stub(usersService, 'getById').resolves(user);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => {
      usersService.getById.restore();
    });

    it('Deve retornar um usuário.', async () => {
      await usersController.getById(req, res);
      expect(res.status).to.be.calledWith(200);
      expect(res.json).to.be.calledWith(user);
    })
  });

  describe('Teste do método getBallance.', () => {
    const req = {};
    const res = { user: users[2] };
    beforeEach(async () => {
      sinon.stub(usersService, 'getBallance').resolves(+users[2].ballance);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });
    afterEach(() => {
      usersService.getBallance.restore();
    });
    it('Deve retornar o saldo conforme esperado.', async () => {
      await usersController.getBallance(req, res);
      expect(res.status).to.be.calledWith(200);
    });
  });
  describe('Teste do método transaction.', () => {
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
      await usersController.transaction(req, res);
      expect(res.status).to.be.calledWith(201);
    });
  });
  describe('Teste do método create.', () => {

    const req = {
      body: {
        cpf: '12345678901',
        email: 'paolo@xpinc.com',
        password: '@PaoloNaXPInc2022',
        userName: 'Paolo',
        ballance: '100000.00',
      }
    }

    const res = { user: users[2] };


    beforeEach(async () => {
      sinon.stub(usersService, 'create').resolves(user);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });
    afterEach(() => {
      usersService.create.restore();
    });
    it('Deve retornar o user criado.', async () => {
      await usersController.create(req, res);
      expect(res.status).to.be.calledWith(201);
      expect(res.json).to.be.calledWith(user);

    });
  });

  describe('Teste do método delete.', () => {
    const req = { params: { id: 'cabfd67e-15e9-4e08-a8ad-0c65f5ed717a' } };
    const res = {  };
    beforeEach(async () => {
      sinon.stub(usersService, 'deleteUser').resolves(true);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });
    afterEach(() => {
      usersService.deleteUser.restore();
    });
    it('Deve retornar true', async () => {
      await usersController.deleteUser(req, res);
      expect(res.status).to.be.calledWith(200);
   
    });
  });

  describe('Teste do método update.', () => {
    const res = { };
    const updated = [
      {
        user_id: 'cabfd67e-15e9-4e08-a8ad-0c65f5ed717a',
        cpf: '12345678901',
        email: 'paolo@xpinc.com',
        password: '@PaoloXP2022',
        name: 'Xablauzer',
        ballance: '65472',
        role: 'admin',
        created_at: '2022-07-17T17:19:16.000Z',
        updated_at: new Date()
      }
    ]
    const req = { body: { user }, params: { id: 'cabfd67e-15e9-4e08-a8ad-0c65f5ed717a' } };
    beforeEach(async () => {
      sinon.stub(usersService, 'updateUser').resolves(updated);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });
    afterEach(() => {
      usersService.updateUser.restore();
    });
    it('Deve retornar um usuário atualizado.', async () => {
      await usersController.updateUser(req, res);
      expect(res.status).to.be.calledWith(200);
    });
  });
});

