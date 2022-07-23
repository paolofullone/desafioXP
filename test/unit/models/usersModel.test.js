const sinon = require('sinon');
const chai = require('chai');

const { expect } = chai;
chai.use(require('chai-as-promised'));

const { describe, it, beforeEach, afterEach } = require('mocha');

const connection = require('../../../src/db/connection');

const usersModel = require('../../../src/models/usersModel');
const stocksModel = require('../../../src/models/stocksModel');

const { users, user, stocks } = require('../../mocks');
const  totalOpValue  = require('../../../src/utils/totalOpValue');

describe('Testes da camada de Model dos usuários', () => {

  describe('Testes do método getByEmail', () => {
    beforeEach(async () => {
      sinon.stub(connection, 'execute').resolves(user);
    });

    afterEach(() => {
      connection.execute.restore();
    });

    it('Deve retornar um array com todos os usuários', async () => {
      const result = await usersModel.getByEmail('paolo@xpinc.com');
      expect(result.email).to.be.equal('paolo@xpinc.com');
      expect(connection.execute.calledOnce).to.be.true;
      expect(connection.execute.calledTwice).to.be.false;
      expect(result.user_name).to.be.equal('Paolo');
      expect(result.cpf).to.be.equal('12345678901');
    });
  });

  describe('Testes do método getAllUsers', () => {
    beforeEach(async () => {
      sinon.stub(connection, 'execute').resolves([users]);
    });

    afterEach(() => {
      connection.execute.restore();
    });

    it('Deve retornar um array com todos os usuários', async () => {
      const result = await usersModel.getAllUsers();
      expect(result.length).to.be.equal(3);
      expect(result[0].email).to.be.equal('luca@xpinc.com');
      expect(result[1].email).to.be.equal('admin@xpinc.com');
      expect(result[2].email).to.be.equal('paolo@xpinc.com');
    });
  });

  describe('Testes do método getAll', () => {
    beforeEach(async () => {
      sinon.stub(connection, 'execute').resolves([users]);
      sinon.stub(usersModel, 'getByEmail').resolves(user);
    });

    afterEach(() => {
      connection.execute.restore();
      usersModel.getByEmail.restore();
    });

    it('Deve retornar um array de usuários', async () => {
      const result = await usersModel.getAll('paolo@xpinc.com');
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(3);
    });
  });

  describe('Testes do método getById', () => {
    beforeEach(async () => {
      sinon.stub(connection, 'execute').resolves([user]);
    });

    afterEach(() => {
      connection.execute.restore();
    });

    it('Deve retornar o usuário "Paolo"', async () => {
      const userReturned = await usersModel.getById('cabfd67e-15e9-4e08-a8ad-0c65f5ed717a');
      expect(userReturned).to.be.an('array');
      expect(userReturned).to.have.lengthOf(1);
      expect(connection.execute.calledOnce).to.be.true;
      expect(connection.execute.calledTwice).to.be.false;
    });
  });
      

  describe('Testes do método getByEmailAndPassword', () => {
    beforeEach(async () => {
      sinon.stub(connection, 'execute').resolves([user]);
    });

    afterEach(() => {
      connection.execute.restore();
    });

    it('Deve retornar um usuário', async () => {
      const userFound = await usersModel.getByEmailAndPassword(
        'paolo@xpinc.com',
        '123456'
      );
      expect(userFound).to.be.an('array');
      expect(userFound).to.have.lengthOf(1);
    });
  });
  describe('Testes do método create', () => {
          const userInfo = {
        email: 'paolo@xpinc.com',
        cpf: '12345678901',
        password: '@PaoloNaXPInc2022',
        userName: 'Paolo',
        ballance: '100000.00',
      }
    beforeEach(async () => {
      sinon.stub(connection, 'execute').resolves([{
        fieldCount: 0,
        affectedRows: 1,
        insertId: 0,
        info: '',
        serverStatus: 2,
        warningStatus: 0
      }]);
    });

    afterEach(() => {
      connection.execute.restore();
    });

    it('Deve retornar um novo usuário criado', async () => {
      const userCreated = await usersModel.create
        ('cabfd67e-15e9-4e08-a8ad-0c65f5ed717a', userInfo);
      expect(userCreated).to.be.an('object');
      expect(userCreated.affectedRows).to.be.equal(1);
    });
  });

  describe('Testes do método create', () => {
    beforeEach(async () => {
      sinon.stub(connection, 'execute').resolves([{
        fieldCount: 0,
        affectedRows: 0,
        insertId: 0,
        info: '',
        serverStatus: 2,
        warningStatus: 0
      }]);
    });

    afterEach(() => {
      connection.execute.restore();
    });

    it('Deve falhar ao criar um novo usuário', async () => {
      const userCreated = await usersModel.create
        ('cabfd67e-15e9-4e08-a8ad-0c65f5ed717a', 'userInfo');
      expect(userCreated).to.be.equal(null);
    });
  });



  describe('Testes do método updateBallance', () => {
    const requestedOperations = [
      {
        "stockId": "670ef6c0-5f48-450d-afc8-e2794d19a49a",
        "quantity": 2
      },
      {
        "stockId": "3f335ba1-5f8a-4b50-b309-3bdcfffb3040",
        "quantity": 2
      }
    ];
    const route = '/comprar';

    beforeEach(async () => {
      sinon.stub(connection, 'execute').resolves({
        fieldCount: 0,
        affectedRows: 1,
        insertId: 0,
        info: 'Rows matched: 1  Changed: 1  Warnings: 0',
        serverStatus: 2,
        warningStatus: 0,
        changedRows: 1
      });
      sinon.stub(stocksModel, 'getAll').resolves(stocks);
      sinon.stub(totalOpValue, 'totalOperationValue').returns(500);
    });

    afterEach(() => {
      connection.execute.restore();
      stocksModel.getAll.restore();
      totalOpValue.totalOperationValue.restore();
    });

    it('Deve retornar um saldo atualizado para o usuário informado', async () => {
      const response = await usersModel.updateBallance(user[0].user_id, route, requestedOperations);
      expect(response).to.be.an('Object');
      expect(response.affectedRows).to.be.equal(1);
    });
  });
  describe('Testes do método transaction', () => {
    beforeEach(async () => {
      sinon.stub(connection, 'execute').resolves([user]);
    });

    afterEach(() => {
      connection.execute.restore();
    });

    it('Deve retonar um usuário com o saldo atualizado', async () => {
      const newBallance = await usersModel.transaction(
        'cabfd67e-15e9-4e08-a8ad-0c65f5ed717a',
        '/comprar',
        [{ stockId: '670ef6c0-5f48-450d-afc8-e2794d19a49a', quantity: 1 }]
      );
      expect(+newBallance).to.be.an('number');
    });
  });

  describe('Testes do método deleteUser', () => {
    beforeEach(async () => {
      sinon.stub(connection, 'execute').resolves([{
        fieldCount: 0,
        affectedRows: 1,
        insertId: 0,
        info: '',
        serverStatus: 2,
        warningStatus: 0
      }]);
    });

    afterEach(() => {
      connection.execute.restore();
    });

    it('Deve retornar um usuário deletado', async () => {
      const userDeleted = await usersModel.deleteUser('cabfd67e-15e9-4e08-a8ad-0c65f5ed717a');
      expect(userDeleted).to.be.an('object');
      expect(userDeleted.affectedRows).to.be.equal(1);
    });
  });
  
  describe('Testes do método updateUser', () => { 
    const userInfo = {
      email: 'paolo@xpinc.com',
      password: '@PaoloNaXPInc2022',
      userName: 'Paolo',
      ballance: '100000.00',
    };

    beforeEach(async () => {
      sinon.stub(connection, 'execute').resolves([{
        fieldCount: 0,
        affectedRows: 1,
        insertId: 0,
        info: '',
        serverStatus: 2,
        warningStatus: 0
      }]);
    });

    afterEach(() => {
      connection.execute.restore();
    });

    it('Deve retornar um usuário atualizado', async () => {
      const userUpdated = await usersModel.updateUser(
        'cabfd67e-15e9-4e08-a8ad-0c65f5ed717a',
        userInfo
      );
      expect(userUpdated).to.be.an('object');
      expect(userUpdated.affectedRows).to.be.equal(1);
    });

  });

});
