const totalWallet = (stockOps) => stockOps.map((stockOp) => {
  const stockAvg = stockOps.filter((stock) => stock.stock_id === stockOp.stock_id);
  const totalValue = stockAvg.reduce((acc, curr) => {
    if (curr.operation === 'buy') {
      return acc + (curr.quantity * curr.value);
    }
    return acc - (curr.quantity * curr.value);
  }, 0);
  const totalQuantity = stockAvg.reduce((acc, curr) => {
    if (curr.operation === 'buy') {
      return acc + curr.quantity;
    }
    return acc - curr.quantity;
  }, 0);
  const avgValue = totalValue / totalQuantity;
  return {
    stock_id: stockOp.stock_id,
    quantity: totalQuantity,
    totalValue,
    avgValue,
  };
});

// pesquisei no google como retornar somente valores únicos de um array com objetos.
// resposta veio pelo grepper, não apareceu nenhum site para referenciar.
const uniqueWallet = (wallet) => {
  const setObj = new Set();
  return wallet.reduce((acc, item) => {
    if (!setObj.has(item.stock_id)) {
      setObj.add(item.stock_id);
      acc.push(item);
    }
    return acc;
  }, []);
};
// a função acima cria um set de objetos e depois verifica se o objeto já existe no set
// caso não exista ele é adicionado, caso já exista segue para o próximo item do set.

const userWallet = async (stockOps) => {
  const wallet = totalWallet(stockOps).filter((stock) => stock.quantity !== 0);
  return uniqueWallet(wallet);
};
// aqui a user wallet deve retornar com ações maior que zero, porém deixei
// diferente de zero para o caso de ter alguma ação com quantidade negativa por engano.
// aqui não vamos cobrir a venda a descoberto

module.exports = { userWallet };
