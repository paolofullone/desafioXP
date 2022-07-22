const sinon = require('sinon');
const chai = require('chai');

const { v4: uuidv4 } = require('uuid');

const { expect } = chai;
chai.use(require('chai-as-promised'));

const { describe, it, beforeEach, afterEach } = require('mocha');

const connection = require('../../../src/db/connection');
const usersModel = require('../../../src/models/usersModel');
const usersService = require('../../../src/services/usersServices');
// const validateAdmin = require('../../../src/middleware/validateAdmin');

const { users, user, mockToken } = require('../../mocks');

describe('Testes da camada de Service dos usuários', () => {
  describe('Teste do método getAll com user admin', () => {
    beforeEach(async () => {
      sinon.stub(usersModel, 'getAll').resolves(users);
    });

    afterEach(() => {
      usersModel.getAll.restore();
    });

    it('Deve retornar um array de usuários', async () => {
      const result = await usersService.getAll('paolo@xpinc.com');
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(3);
      expect(result[0]).to.have.property('user_id');
      expect(result[0]).to.have.property('cpf');
      expect(result[0]).to.have.property('email');
      expect(result[0]).to.have.property('user_name');
      expect(result[0]).to.have.property('role');
    });
  });

  describe('Teste do método getById', () => {
    beforeEach(async () => {
      sinon.stub(usersModel, 'getById').resolves(user);
    });

    afterEach(() => {
      usersModel.getById.restore();
    });

    it('Deve retornar um usuário', async () => {
      const result = await usersService.getById(
        'cabfd67e-15e9-4e08-a8ad-0c65f5ed717a'
      );
      expect(result[0]).to.have.property('user_id');
      expect(result[0]).to.have.property('cpf');
      expect(result[0]).to.have.property('email');
      expect(result[0]).to.have.property('user_name');
      expect(result[0]).to.have.property('role');
    });
  });

  describe('Teste do método getById com id inexistente', () => {
    beforeEach(async () => {
      sinon.stub(usersModel, 'getById').resolves([]);
    });

    afterEach(() => {
      usersModel.getById.restore();
    });

    it('Deve retornar um usuário', async () => {
      try {
        await usersService.getById('Id-Do-Paolo-Ainda-Não-Existe-Na-XP');
      } catch (error) {
        expect(error.status).to.be.equal(404);
        expect(error.message).to.be.equal('Usuário não encontrado.');
      }
    });
  });

  describe('Teste do método getByEmailAndPassword', () => {
    beforeEach(async () => {
      sinon.stub(usersModel, 'getByEmailAndPassword').resolves(mockToken.token);
    });
    afterEach(() => {
      usersModel.getByEmailAndPassword.restore();
    });
    it('Deve retornar um token conforme esperado', async () => {
      const result = await usersService.getByEmailAndPassword(
        'paolo@xpinc.com',
        '@PaoloNaXPInc2022'
      );
      expect(result).to.be.a('string');
    });
  });

  describe('Teste do método getByEmailAndPassword', () => {
    beforeEach(async () => {
      sinon.stub(usersModel, 'getByEmailAndPassword').resolves([]);
    });
    afterEach(() => {
      usersModel.getByEmailAndPassword.restore();
    });
    it('Deve retornar um erro', async () => {
      try {
        await usersService.getByEmailAndPassword('paolo@xpinc.com', '');
      } catch (error) {
        expect(error.status).to.be.equal(401);
        expect(error.message).to.be.equal(
          'Usuário não encontrado, favor verificar email e senha informados.'
        );
      }
    });
  });

  describe('Teste do método getBallance', () => {
    beforeEach(async () => {
      sinon.stub(usersModel, 'getByEmail').resolves(user);
    });
    afterEach(() => {
      usersModel.getByEmail.restore();
    });
    it('Deve retornar um saldo conform esperado', async () => {
      const ballance = await usersService.getBallance('paolo@xpinc.com');
      expect(+ballance).to.be.a('number');
      expect(+ballance).to.be.equal(100000.0);
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
      const ballance = await usersService.transaction(
        'paolo@xpinc.com',
        100000,
        '/deposit'
      );
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
    beforeEach(async () => {
      sinon.stub(usersModel, 'create').resolves(user);
    });
    afterEach(() => {
      usersModel.create.restore();
    });
    it('Deve retornar o user criado', async () => {
      const userId = uuidv4();
      const newUser = await usersService.create(userId, inputUser);
      expect(newUser).to.be.an('array');
      expect(newUser[0].user_name).to.be.equal('Paolo');
      expect(newUser[0].email).to.be.equal('paolo@xpinc.com');
    });
  });

  describe('Teste de falha do método create', () => {
    const inputUser = {
      email: 'paolo@xpinc.com',
      cpf: '12345678904',
      password: '@PaoloNaXPInc2022',
      userName: 'Paolo',
      ballance: 100000,
    };
    beforeEach(async () => {
      sinon
        .stub(usersModel, 'create')
        .resolves(
          new Error(
            'Usuário já existe no banco de dados. Favor informar um email e CPF únicos.'
          )
        );
    });
    afterEach(() => {
      usersModel.create.restore();
    });
    it('Deve retornar um erro', async () => {
      try {
        const userId = uuidv4();
        await usersService.create(userId, inputUser);
        console.log('deu ruim');
      } catch (error) {
        console.log('errror', error);
        expect(error.message).to.be.equal(
          'Usuário já existe no banco de dados. Favor informar um email e CPF únicos.'
        );
      }
    });
  });

  describe('Teste do método delete', () => {
    beforeEach(async () => {
      sinon.stub(usersModel, 'deleteUser').resolves({ affectedRows: 1 });
    });

    afterEach(() => {
      usersModel.deleteUser.restore();
    });
    it('Quando exclui um usuário com sucesso', async () => {
      const result = await usersService.deleteUser(
        'cabfd67e-15e9-4e08-a8ad-0c65f5ed717a'
      );
      console.log('result', result);
      expect(result).to.be.equal(true);
    });
  });

  describe('Teste do método delete', () => {
    beforeEach(async () => {
      sinon.stub(usersModel, 'deleteUser').resolves({ affectedRows: 0 });
    });

    afterEach(() => {
      usersModel.deleteUser.restore();
    });
    it('Quando falha em excluir um usuário', async () => {
      try {
        await usersService.deleteUser('cabfd67e-15e9-4e08-a8ad-0c65f5ed717a');
      } catch (error) {
        expect(error.message).to.be.equal('Usuário não encontrado.');
      }
    });
  });

  describe('Teste do método update', () => {
    const inputUser = {
      email: 'paolo@xpinc.com',
      password: '@PaoloXP2022',
      userName: 'Xablauzer',
      ballance: 65472.0,
    };
    beforeEach(async () => {
      sinon.stub(usersModel, 'updateUser').resolves(user);
    });

    afterEach(() => {
      usersModel.updateUser.restore();
    });
    it('Deve retornar o usuário atualizado', async () => {
      const result = await usersService.updateUser(
        'cabfd67e-15e9-4e08-a8ad-0c65f5ed717a',
        inputUser
      );
      expect(result).to.be.an('array');
      expect(result[0].user_name).to.be.equal('Xablauzer');
      expect(result[0].email).to.be.equal('paolo@xpinc.com');
    });
  });

  describe('Teste do método update', () => {
    const inputUser = {
      email: 'VouTrabalharNaXP@xpinc.com',
      password: '@PaoloXP2022',
      userName: 'Xablauzer',
      ballance: 65472.0,
    };
    beforeEach(async () => {
      sinon.stub(usersModel, 'updateUser').resolves([]);
    });

    afterEach(() => {
      usersModel.updateUser.restore();
    });
    it('Deve falhar ao atualizar um usuário.', async () => {


      try {
      await usersService.updateUser(
        'cabfd67e-15e9-4e08-a8ad-0c65f5ed717a',
        inputUser
      );
      } catch (error) {
        expect(error.message).to.be.equal('Usuário não encontrado.');
      }
    });
  });
});
