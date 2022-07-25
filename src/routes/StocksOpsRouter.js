const express = require('express');

const router = express.Router();

const stocksOpsController = require('../controllers/stocksOpsController');
const validateAuth = require('../middleware/validateAuth');
const validateStocks = require('../middleware/validateStocks');
const validateSell = require('../middleware/validateSell');
const validateBallance = require('../middleware/validateBallance');
const validateUserSellStocks = require('../middleware/validateUserSellStocks');
const validateAdmin = require('../middleware/validateAdmin');

/**
 * @swagger
 * /investimentos:
 *  get:
 *    tags:
 *     - UserWallet
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

router.get('/', validateAuth, validateAdmin, stocksOpsController.getAll);

/**
 * @swagger
 * /investimentos/{id}:
 *  get:
 *    tags:
 *     - UserWallet
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
router.get('/:userId', validateAuth, stocksOpsController.getWalletByUserId);

/**
 * @swagger
 * /investimentos/comprar:
 *  post:
 *    tags:
 *     - UserWallet
 *    description: Realiza uma compra de ações da pessoa usuária logada.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/StockOpsPurchaseOrSale'
 *    security:
 *     - bearerAuth: []
 *    responses:
 *      201:
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/StockOpsPurchaseApproved'
 *      400:
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/StockOpsPurchaseNoFunds'
 *      401:
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/TokenExpiredOrInvalid'
 *      500:
 *        description: Erro interno.
*/
router.post('/comprar', validateAuth, validateStocks, validateBallance, stocksOpsController.create);

/**
 * @swagger
 * /investimentos/vender:
 *  post:
 *    tags:
 *     - UserWallet
 *    description: Realiza uma venda de ações da pessoa usuária logada.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/StockOpsPurchaseOrSale'
 *    security:
 *     - bearerAuth: []
 *    responses:
 *      201:
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/StockOpsApproved'
 *      400:
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/StockOpsSaleNotApproved'
 *      401:
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/TokenExpiredOrInvalid'
 *      500:
 *        description: Erro interno.
*/
router.post('/vender', validateAuth, validateSell, validateUserSellStocks, stocksOpsController.create);

module.exports = router;
