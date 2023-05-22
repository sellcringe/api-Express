const express = require('express')
const controller = require('../controllers/auth')
const router = express.Router()

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: Object
 *          required:
 *
 *              -email
 *              -password
 *          properties:
 *              id:
 *                  type: integer
 *                  description: the auto-generated id of the User
 *              email:
 *                  type: string
 *                  description: email
 *              password:
 *                  type: string
 *                  description: password
 *          example:
 *              id: 1
 *              email: myname@mail.ru
 *              password: myPasSwOrd
 */
/**
 * @swagger
 * /auth/login:
 *  post:
 *      summary: login in api
 *      tags: [User]
 *      responses:
 *          200:
 *              description: login
 *              content:
 *                  application/json:
 *                      example:
 *                          email : email@email.com
 *                          password: pasWrord
 */
router.post('/login', controller.login)
/**
 * @swagger
 * /auth/register:
 *  post:
 *      summary: register in api
 *      tags: [User]
 *      responses:
 *          201:
 *              description: register
 *              content:
 *                  application/json:
 *                      example:
 *                          email : email@email.com
 *                          password: pasWrord
 */
router.post('/register', controller.register)
/**
 * @swagger
 * /auth/users:
 *  get:
 *      summary: get ALl Users
 *      tags: [User]
 *      responses:
 *          200:
 *              description: return ALl Users json
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/User'
 *
 */

router.get('users', controller.getAll)

module.exports = router