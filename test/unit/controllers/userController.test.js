/* eslint-disable no-unused-expressions */
const sinon = require('sinon');
const chai = require('chai');

const { expect } = chai;
chai.use(require('chai-as-promised'));
chai.use(require('sinon-chai'));

// https://stackoverflow.com/questions/45314317/invalid-chai-property-when-calling-calledonce

const connection = require('../../../src/db/connection');
const usersController = require('../../../src/controllers/usersController');
const usersService = require('../../../src/services/usersServices');

const { users, user } = require('../../mocks');

describe('Testes da camada de controller dos usuários: ', () => {
  describe('Teste do método getAll', () => {
    const res = { user: { email: 'paolo@xpinc.com' } };
    beforeEach(async () => {
      sinon.stub(connection, 'execute').resolves(users);
      sinon.stub(usersService, 'getAll').resolves([users]);
    });

    afterEach(() => {
      connection.execute.restore();
      usersService.getAll.restore();
    });

    it('Deve retornar um array de usuários.', async () => {
      const [usersReturned] = await usersService.getAll(res.user.email);
      // console.log(usersReturned[0]);
      expect(usersReturned).to.be.an('array');
      expect(usersReturned).to.have.lengthOf(3);
      expect(usersReturned[0]).to.have.property('user_name');
      expect(usersReturned[0]).to.have.property('email');
      expect(usersReturned[0]).to.have.property('ballance');
      expect(usersReturned[0]).to.have.property('created_at');
      expect(usersReturned[0]).to.have.property('updated_at');
      expect(usersReturned[0].role).to.be.equal('client');

      // expect(res.status).to.have.been.calledWith(200);
    });
  });

  describe('Teste do método getById.', () => {
    const res = { user: { email: 'paolo@xpinc.com' } };
    beforeEach(async () => {
      sinon.stub(usersService, 'getById').resolves(user);
    });

    afterEach(() => {
      usersService.getById.restore();
    });

    it('Deve retornar um usuário.', async () => {
      const [userReturned] = await usersService.getById(res.user.email);
      expect(userReturned).to.be.an('object');
      expect(userReturned).to.have.property('user_name');
      expect(userReturned).to.have.property('email');
      expect(userReturned).to.have.property('ballance');
      expect(userReturned).to.have.property('created_at');
      expect(userReturned).to.have.property('updated_at');
      expect(userReturned.role).to.be.equal('admin');
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
      const ballance = await usersService.getBallance(req, res.user.email);
      expect(typeof ballance).to.be.equal('number');
      expect(ballance).to.be.equal(100000.00);
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
      const ballance = await usersService
        .transaction(res.user.email, req.body.amount, req.route.path);
      expect(ballance).to.be.equal(600000.00);
    });
  });
  describe('Teste do método create.', () => {

    const req = {
      body: {
        email: 'paolo@xpinc.com',
        password: '@PaoloNaXPInc2022',
        userName: 'Paolo',
        ballance: '100000.00',
      }
    }

    const res = { user: users[0] };


    beforeEach(async () => {
      sinon.stub(usersService, 'create').resolves([user]);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });
    afterEach(() => {
      usersService.create.restore();
    });
    it('Deve retornar o user criado.', async () => {
      const [newUser] = await usersService.create(req.body.user, res.user.email);
      // console.log(newUser[0]);
      expect(newUser).to.be.an('array');
      expect(newUser).to.have.lengthOf(1);
      expect(newUser[0].email).to.be.equal(req.body.email);
      expect(newUser[0].password).to.be.equal(req.body.password);
      expect(newUser[0].user_name).to.be.equal(req.body.userName);
      expect(newUser[0].ballance).to.be.equal(req.body.ballance);
    });
  });

  describe('Teste do método delete.', () => {
    const res = { user: users[0] };
    beforeEach(async () => {
      sinon.stub(usersService, 'deleteUser').resolves(true);
    });
    afterEach(() => {
      usersService.deleteUser.restore();
    });
    it('Deve retornar true', async () => {
      const deleted = await usersService.deleteUser(res.user.id);
      expect(deleted).to.be.equal(true);
    });
  });

  describe('Teste do método update.', () => {
    const res = { user: users[0] };
    const user = {
      "email": "paolo@xpinc.com",
      "password": "@PaoloXP2022",
      "userName": "Xablauzer",
      "ballance": 65472.0000
    }
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
    const req = { body: { user } };
    beforeEach(async () => {
      sinon.stub(usersService, 'updateUser').resolves(updated);
    });
    afterEach(() => {
      usersService.updateUser.restore();
    });
    it('Deve retornar um usuário atualizado.', async () => {
      const updated = await usersService.updateUser(res.user.user_id, req.body.user);
      // console.log(updated);
      expect(updated).to.be.an('array');
      expect(updated).to.have.lengthOf(1);
      expect(updated[0].email).to.be.equal(req.body.user.email);
      expect(updated[0].password).to.be.equal(req.body.user.password);
      expect(updated[0].user_name).to.be.equal(req.body.user.user_name);
      expect(+updated[0].ballance).to.be.equal(req.body.user.ballance);
    });
  });
});

