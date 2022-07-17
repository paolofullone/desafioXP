const totalWallet = (stockOps) => stockOps.map((stockOp) => {
  const eachStock = stockOps.filter((stock) => stock.stock_id === stockOp.stock_id);
  const totalValue = eachStock.reduce((acc, curr) => acc + curr.quantity * curr.value, 0);
  const totalQuantity = eachStock.reduce((acc, curr) => acc + curr.quantity, 0);
  return {
    stock_id: stockOp.stock_id,
    quantity: totalQuantity,
    value: totalValue,
  };
});

// pesquisei no google como retornar somente valores únicos de um array com objetos.
// resposta veio pelo grepper, não apareceu nenhum site para referenciar.
const uniqueWallet = (wallet) => {
  const setObj = new Set();
  const newWallet = wallet.reduce((acc, item) => {
    if (!setObj.has(item.stock_id)) {
      setObj.add(item.stock_id);
      acc.push(item);
    }
    return acc;
  }, []);
  return newWallet;
};
// a função acima cria um set de objetos e depois verifica se o objeto já existe no set
// caso não exista ele é adicionado, caso já exista segue para o próximo item do set.

const userWallet = async (stockOps) => {
  const wallet = totalWallet(stockOps).filter((stock) => stock.quantity > 0);
  return uniqueWallet(wallet);
};

// user wallet only in one function with reduce

module.exports = { userWallet };
