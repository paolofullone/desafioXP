const express = require('express');

const router = express.Router();

const usersController = require('../controllers/usersController');
const validateAuth = require('../middleware/validateAuth');
const validateWithdraw = require('../middleware/validateWithdraw');
const validateNewUser = require('../middleware/validateNewUser');
const validateTransaction = require('../middleware/ValidateTransaction');
const validateAdmin = require('../middleware/validateAdmin');

router.use(validateAuth);

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
router.get('/', validateAdmin, usersController.getAll);

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
router.post('/', validateAdmin, validateNewUser, usersController.create);

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
router.post('/deposit', validateTransaction, usersController.transaction);

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
router.post('/withdraw', validateTransaction, validateWithdraw, usersController.transaction);

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
router.get('/ballance', usersController.getBallance);

/**
 * @swagger
 * /users/{id}:
 *  get:
 *    tags:
 *     - Users
 *    description: Retorna os dados da pessoa usuária.
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/UserResponse'
 *      400:
 *        description: Faltam campos exigidos para a requisição.
 *      401:
 *        description: Token expirado ou inválido.
 *      403:
 *        description: Acesso negado.
 *      500:
 *        description: Erro interno.
*/
router.get('/:id', usersController.getById);

/**
 * @swagger
 * /users/{id}:
 *  delete:
 *    tags:
 *     - Users
 *    description: Deleta o usuário do banco de dados.
 *    security:
 *     - bearerAuth: []
 *    responses:
 *      200:
 *       content:
 *        application/json:
 *         schema:
 *          type: array
 *         items:
 *         $ref: '#/components/schemas/UserDeleted'
 *      404:
 *        description: Usuário não encontrado.
 *      500:
 *        description: Erro interno.
*/
router.delete('/:id', usersController.deleteUser);

/**
 * @swagger
 * /users/{id}:
 *  put:
 *    tags:
 *     - Users
 *    description: Atualiza email, senha, nome e saldo (cpf somente o DBA pode atualizar).
 *    security:
 *     - bearerAuth: []
 *    responses:
 *      200:
 *       content:
 *        application/json:
 *         schema:
 *          type: array
 *         items:
 *         $ref: '#/components/schemas/UserResponse'
 *      400:
 *        description: Favor informar todos os campos para criação do usuário.
 *      404:
 *        description: Usuário não encontrado.
 *      500:
 *        description: Erro interno.
*/
router.put('/:id', validateNewUser, usersController.updateUser);

module.exports = router;
