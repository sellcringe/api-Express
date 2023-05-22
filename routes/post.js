const express = require('express')
const controller = require('../controllers/post')
const passport = require('passport')
const upload = require('../middleware/file')
const router = express.Router()

/**
 * @swagger
 * components:
 *  schemas:
 *      Post:
 *          type: Object
 *          required:
 *
 *              -content
 *              -file_url
 *          properties:
 *              id:
 *                  type: integer
 *                  description: the auto-generated id of the Post
 *              content:
 *                  type: string
 *                  description: contnet in the Post
 *              file_url:
 *                  type: string
 *                  description: file_url in the Post
 *          example:
 *              id: 1
 *              content: helloWorld!
 *              file_url: http://url_adress/upload/nameFile.jpg/mp3/mp4/other
 */
/**
 * @swagger
 * /post?page=0&size=20:
 *  get:
 *      summary: Returns the list of posts
 *      tags: [Post]
 *      responses:
 *          200:
 *              description: the list of posts
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Post'
 */

router.get('',passport.authenticate('jwt', {session: false}), controller.getAll)
/**
 * @swagger
 * /post:
 *  post:
 *      summary: create post with mediafile
 *      tags: [Post]
 *      responses:
 *          201:
 *              description: create post
 *              content:
 *                  application/json:
 *                      example:
 *                          content: text - block
 *                          file: file
 */

router.post('',passport.authenticate('jwt', {session: false}),  upload.single('file'),  controller.create)

/**
 * @swagger
 * /post/{id}:
 *  put:
 *      summary: update post with mediafile
 *      tags: [Post]
 *      parameters:
 *           name: id
 *           schema:
 *              type: integer
 *           required: true
 *           description: the post id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Post'
 *
 *      request:
 *          200:
 *              description: update post
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Post'
 */
router.put('/:id',passport.authenticate('jwt', {session: false}),  upload.single('file'), controller.update )
/**
 * @swagger
 * /post/{id}:
 *  delete:
 *      summary: destroy post with mediafile
 *      tags: [Post]
 *      parameters:
 *           name: id
 *           schema:
 *              type: integer
 *           required: true
 *           description: the post id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Post'
 *
 *      request:
 *          200:
 *              description: destroy post

 */
router.delete('/:id',passport.authenticate('jwt', {session: false}),controller.deletePost)
module.exports = router


