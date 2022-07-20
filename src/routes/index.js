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
 *         - password
 *         - userName
 *         - ballance
 *        properties:
 *         email:
 *          type: string
 *         password:
 *          type: string
 *         userName:
 *           type: string
 *         ballance:
 *          type: number
 *        example:
 *         email: 'paolo@xpinc.com.br'
 *         password: '@PaoloNaXPInc2022'
 *         userName: Paolo Enrico
 *         ballance: 100000.00
 *    UserResponse:
 *        type: object
 *        example:
 *           user_id: 'cabfd67e-15e9-4e08-a8ad-0c65f5ed717a'
 *           email: 'emailinformado@dominio.com'
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
 *    Stocks:
 *        type: object
 *        example:
 *         stock_id: '670ef6c0-5f48-450d-afc8-e2794d19a49a'
 *         available_quantity: '100000.00'
 *         value: '829.00'
 *         ticker: 'XPINC'
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
 *
 */

/**
 * @swagger
 *  /login:
 *    post:
 *      tags: [Login]
 *      description: Endpoint para fazer login na aplicação.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Login'
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Login'
 *        400:
 *          description: Erro ao fazer login. Faltam campo email e/ou senha.
 *        401:
 *          description: Usuário não encontrado com as credenciais informadas.
 *        500:
 *          description: Erro interno.
 */

/**
 * @swagger
 * /users:
 *  get:
 *    tags:
 *     - Users
 *    description: Retorna os dados de todas as pessoas usuárias (requer admin).
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 *      400:
 *        description: Faltam campos exigidos para a requisição.
 *      401:
 *        description: Token expirado ou inválido.
 *      403:
 *        description: Acesso negado.
 *      500:
 *        description: Erro interno.
*/

/**
 * @swagger
 * /users:
 *  post:
 *    tags:
 *     - Users
 *    description: Cria uma pessoa usuária na aplicação (requer admin).
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *    security:
 *     - bearerAuth: []
 *    responses:
 *      201:
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/UserResponse'
 *      400:
 *        description: Faltam campos exigidos para a requisição.
 *      401:
 *        description: JWT Token expirado ou inválido.
 *      403:
 *        description: Acesso negado.
 *      409:
 *        description: Usuário já existe.
 *      500:
 *        description: Erro interno.
*/

/**
 * @swagger
 * /users/deposit:
 *  post:
 *    tags:
 *     - UserAccount
 *    description: Realiza um depósito na conta da pessoa usuária logada.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/UserAccount'
 *    security:
 *     - bearerAuth: []
 *    responses:
 *      201:
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/UserAccountResponse'
 *      400:
 *        description: Faltam campos exigidos para a requisição.
 *      401:
 *        description: JWT Token expirado ou inválido.
 *      500:
 *        description: Erro interno.
 *
*/

/**
 * @swagger
 * /users/withdraw:
 *  post:
 *    tags:
 *     - UserAccount
 *    description: Realiza um saque na conta da pessoa usuária logada.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/UserAccount'
 *    security:
 *     - bearerAuth: []
 *    responses:
 *      201:
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/UserAccountResponse'
 *      400:
 *        description: Faltam campos exigidos para a requisição
 *          ou valor da retirada superior ao saldo da conta.
 *      401:
 *        description: JWT Token expirado ou inválido.
 *      500:
 *        description: Erro interno.
*/

/**
 * @swagger
 * /users/ballance:
 *  get:
 *    tags:
 *     - UserAccount
 *    description: Realiza uma consulta no saldo da conta da pessoa usuária logada.
 *    security:
 *     - bearerAuth: []
 *    responses:
 *      201:
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/UserBallance'
 *      401:
 *        description: JWT Token expirado ou inválido.
 *      500:
 *        description: Erro interno.
*/

/**
 * @swagger
 * /stocks:
 *  get:
 *    tags:
 *     - Stocks
 *    description: Consulta de todas as ações cadastradas no Banco de Dados (requer admin).
 *    security:
 *     - bearerAuth: []
 *    responses:
 *      201:
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Stocks'
 *      401:
 *        description: JWT Token expirado ou inválido.
 *      403:
 *        description: Acesso negado.
 *      500:
 *        description: Erro interno.
*/

/**
 * @swagger
 * /stocks/{id}:
 *  get:
 *    tags:
 *     - Stocks
 *    description: Consulta de uma ação no banco de dados.
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *    security:
 *     - bearerAuth: []
 *    responses:
 *      201:
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Stocks'
 *      401:
 *        description: JWT Token expirado ou inválido.
 *      404:
 *        description: Ação não encontrada.
 *      500:
 *        description: Erro interno.
*/

/**
 * @swagger
 * /stocks:
 *  post:
 *    tags:
 *     - Stocks
 *    description: Cria uma nova ação no BD (requer admin).
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/StocksRequest'
 *    security:
 *     - bearerAuth: []
 *    responses:
 *      201:
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Stocks'
 *      400:
 *        description: Faltam campos exigidos para a requisição.
 *      401:
 *        description: JWT Token expirado ou inválido.
 *      403:
 *        description: Acesso negado.
 *      409:
 *        description: Ação já existe.
 *      500:
 *        description: Erro interno.
 */

/**
 * @swagger
 * /stocksOperations:
 *  get:
 *    tags:
 *     - Wallet
 *    description: Retorna todas as operações de todas as pessoas usuárias. (requer admin).
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/WalletResponse'
 *      401:
 *        description: Token expirado ou inválido.
 *      403:
 *        description: Acesso negado.
 *      500:
 *        description: Erro interno.
*/

/**
 * @swagger
 * /stocksOperations/{id}:
 *  get:
 *    tags:
 *     - Wallet
 *    description: Retorna todas as operações da pessoa usuária logada.
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *    security:
 *     - bearerAuth: []
 *    responses:
 *      201:
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/WalletResponse'
 *      401:
 *        description: JWT Token expirado ou inválido.
 *      404:
 *        description: Ação não encontrada.
 *      500:
 *        description: Erro interno.
*/

const usersRouter = require('./usersRouter');
const stocksRouter = require('./stocksRouter');
const stocksOpsRouter = require('./StocksOpsRouter');
const loginRouter = require('./loginRouter');

app.use('/users', usersRouter);
app.use('/stocks', stocksRouter);
app.use('/stocksOperations', stocksOpsRouter);
app.use('/login', loginRouter);

module.exports = app;
