const totalOperationValue = (operations, stocks) => operations.map(({ stockId, quantity }) => {
  const stock = stocks.find((s) => s.stock_id === stockId);
  return quantity * (+stock.value);
}).reduce((acc, curr) => acc + curr, 0);

module.exports = { totalOperationValue };
