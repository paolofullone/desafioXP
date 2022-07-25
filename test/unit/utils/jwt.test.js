const chai = require('chai');

const { expect } = chai;

const { describe, it } = require('mocha');

const JsonWebToken = require('../../../src/utils/jwt');

describe('Teste da geração e validação de tokens JWT', () => { 
  describe('Teste do método generateJWTToken', () => {
    it('Deve gerar um token JWT', async () => {
      const token = await JsonWebToken.generateJWTToken('paolo@xpinc.com', '1234567890');
      expect(token).to.be.not.null;
      expect(token).to.be.not.undefined;
      expect(token).to.be.a('string');
      expect(token.length).to.be.greaterThan(100);
    });
  });
  describe('Teste do método authenticateToken', () => {
    it('Deve validar um token JWT', async () => {
      const token = await JsonWebToken.generateJWTToken('paolo@xpinc.com', '1234567890');
      const decoded = await JsonWebToken.authenticateToken(token);
      expect(decoded).to.be.not.null;
      expect(decoded).to.be.not.undefined;
      expect(decoded).to.be.a('object');
      expect(decoded.email).to.be.equal('paolo@xpinc.com');
      expect(decoded.userId).to.be.equal('1234567890');
    });
  });

  describe('Teste do método authenticateToken', () => {
    it('Deve retornar um erro quando o token não for encontrado', async () => {
      try {
        await JsonWebToken.authenticateToken();
      } catch (error) {
        expect(error).to.be.not.null;
        expect(error).to.be.not.undefined;
        expect(error.message).to.be.equal('Token não encontrado.');
        expect(error.status).to.be.equal(400);
      };
    });
  });

  describe('Teste do método authenticateToken', () => {
    it('Deve retornar um erro quando o token for inválido', async () => {
      try {
        await JsonWebToken.authenticateToken('1234567890');
      } catch (error) {
        expect(error).to.be.not.null;
        expect(error).to.be.not.undefined;
        expect(error.message).to.be.equal('Token expirado ou inválido');
        expect(error.status).to.be.equal(401);
      };
    });
  });
})