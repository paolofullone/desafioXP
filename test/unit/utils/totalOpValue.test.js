const chai = require('chai');

const { expect } = chai;

const { describe, it } = require('mocha');
const { stocks, requestedOperations } = require('../../mocks');

const totalOp = require('../../../src/utils/totalOpValue')

describe('Teste da função que calcula o valor total da operação', () => {
  it('Deve retornar o valor total da operação', () => {

    const total = totalOp.totalOperationValue(requestedOperations, stocks);
    expect(total).to.be.not.null;
    expect(total).to.be.not.undefined;
    expect(total).to.be.a('number');
    expect(total).to.be.equal(400);
  })
});

