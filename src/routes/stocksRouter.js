const express = require('express');

const router = express.Router();

const stocksController = require('../controllers/stocksController');
const validateAuth = require('../middleware/validateAuth');
const validateNewStock = require('../middleware/validateNewStock');
const validateAdmin = require('../middleware/validateAdmin');

router.use(validateAuth);

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
router.get('/', validateAdmin, stocksController.getAll);

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
router.post('/', validateAdmin, validateNewStock, stocksController.create);

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
router.get('/:id', stocksController.getById);

module.exports = router;
