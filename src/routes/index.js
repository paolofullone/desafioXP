const express = require('express');

const app = express();

// documentation

/**
 * @swagger
 * components:
 *   schemas:
 *    Login:
 *        type: object
 *        required:
 *         - email
 *         - password
 *        properties:
 *         email:
 *          type: string
 *         password:
 *          type: string
 *        example:
 *         email: 'paolo@xpinc.com'
 *         password: '@PaoloNaXPInc2022'
 *    TokenExpiredOrInvalid:
 *        example:
 *         message: 'Token expired or invalid'
 *    LoginClient:
 *        type: object
 *        required:
 *         - email
 *         - password
 *        properties:
 *         email:
 *          type: string
 *         password:
 *          type: string
 *        example:
 *         email: 'luca@xpinc.com'
 *         password: '@PaoloNaXPInc2022'
 *    User:
 *        type: object
 *        required:
 *         - email
 *         - cpf
 *         - password
 *         - userName
 *         - ballance
 *        properties:
 *         email:
 *          type: string
 *         cpf:
 *          type: string
 *         password:
 *          type: string
 *         userName:
 *           type: string
 *         ballance:
 *          type: number
 *        example:
 *         email: 'paolo.enrico@xpinc.com.br'
 *         cpf: '12345678905'
 *         password: '@PaoloNaXPInc2022'
 *         userName: Paolo Enrico
 *         ballance: 100000.00
 *    UserResponse:
 *        type: object
 *        example:
 *           user_id: 'cabfd67e-15e9-4e08-a8ad-0c65f5ed717a'
 *           email: 'emailinformado@dominio.com'
 *           cpf: '12345678901'
 *           password: '@LetrasNumeros123'
 *           user_name: 'NomeInformado'
 *           ballance: '100000.00'
 *           role: 'client'
 *           created_at: '2022-07-17T17:19:16.000Z'
 *           updated_at: '2022-07-17T17:19:16.000Z'
 *    UserAccount:
 *        type: object
 *        required:
 *         - amount
 *        properties:
 *         amount:
 *          type: number
 *        example:
 *         amount: 100000.00
 *    UserAccountResponse:
 *        type: object
 *        example:
 *         message: 'Movimentação realizada com sucesso. Saldo atual 1.0000.00.'
 *    UserBallance:
 *        type: object
 *        example:
 *         message: 'Saldo atual 1.0000.00.'
 *    UserDeleted:
 *        example:
 *         message: 'Usuário excluído com sucesso.'
 *    Stocks:
 *        type: object
 *        example:
 *         stock_id: '670ef6c0-5f48-450d-afc8-e2794d19a49a'
 *         available_quantity: '100000.00'
 *         value: '829.00'
 *         ticker: 'XPIN3'
 *         name: 'XP Inc'
 *         created_at: '2022-07-17T17:19:16.000Z'
 *         updated_at: '2022-07-17T17:19:16.000Z'
 *    StocksRequest:
 *        type: object
 *        required:
 *         - name
 *         - ticker
 *         - value
 *         - availableQuantity
 *        properties:
 *         name:
 *          type: string
 *         ticker:
 *          type: string
 *         value:
 *          type: number
 *         availableQuantity:
 *          type: number
 *        example:
 *         name: 'XP Inc'
 *         ticker: 'XPINC'
 *         value: 345.00
 *         availableQuantity: 100000.00
 *    WalletResponse:
 *        type: object
 *        example:
 *         op_id: 'a3e53067-142b-4b9a-aae7-ebb79e42a4a0'
 *         user_id: 'cabfd67e-15e9-4e08-a8ad-0c65f5ed717a'
 *         stock_id: '670ef6c0-5f48-450d-afc8-e2794d19a49a'
 *         amount: '100000.00'
 *         created_at: '2022-07-17T17:19:16.000Z'
 *         updated_at: '2022-07-17T17:19:16.000Z'
 *    StockOpsPurchaseOrSale:
 *        type: array
 *        items:
 *         type: object
 *         example:
 *          stockId: '670ef6c0-5f48-450d-afc8-e2794d19a49a'
 *          quantity: 200
 *    StockOpsApproved:
 *        type: object
 *        example:
 *         message: 'Operações cadastradas com sucesso.'
 *    StockOpsPurchaseNoFunds:
 *        type: object
 *        example:
 *         message: 'Saldo insuficiente para a operação solicitada.'
 *    StockOpsSaleNotApproved:
 *        type: objec
 *        example:
 *         message: 'Operação não autorizada.'
 */

const usersRouter = require('./usersRouter');
const stocksRouter = require('./stocksRouter');
const stocksOpsRouter = require('./StocksOpsRouter');
const loginRouter = require('./loginRouter');

app.use('/users', usersRouter);
app.use('/ativos', stocksRouter);
app.use('/investimentos', stocksOpsRouter);
app.use('/login', loginRouter);

module.exports = app;
