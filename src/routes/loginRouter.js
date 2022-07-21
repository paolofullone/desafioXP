const express = require('express');

const router = express.Router();

const validateLogin = require('../middleware/validateLogin');
const loginController = require('../controllers/loginController');

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
router.post('/', validateLogin, loginController.login);

module.exports = router;
