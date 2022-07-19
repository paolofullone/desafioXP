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
 */

/**
 * @swagger
 *  /login:
 *    post:
 *      tags: [Login]
 *      description: Endpoint para fazer login.
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
 */

/**
 * @swagger
 * /users:
 *  get:
 *    tags:
 *     - Users
 *    description: Retorna os dados da pessoa usuária, caso seja admin, retorna todos os
 *     dados de todas as pessoas usuárias.
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
*/

/**
 * @swagger
 * /users:
 *  post:
 *    tags:
 *     - Users
 *    description: Cria um usário.
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
*/

/**
 * @swagger
 * /users/deposit:
 *  post:
 *    tags:
 *     - UserAccount
 *    description: Realiza um depósito na conta de um usuário.
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
*/

/**
 * @swagger
 * /users/withdraw:
 *  post:
 *    tags:
 *     - UserAccount
 *    description: Realiza um saque na conta de um usuário.
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
*/

/**
 * @swagger
 * /users/ballance:
 *  post:
 *    tags:
 *     - UserAccount
 *    description: Realiza uma consulta no saldo da conta da pessoa usuária.
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
 *                $ref: '#/components/schemas/UserBallance'
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
