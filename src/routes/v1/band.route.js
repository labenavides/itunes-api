const express = require('express');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/band.validation');
const bandController = require('../../controllers/band.controller');

const router = express.Router();

router.route('/search_tracks').get(validate(userValidation.searchByName), bandController.searchTracks);

router.route('/favoritos').post(validate(userValidation.postFavorites), bandController.favorites);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and retrieval
 */

/**
 * @swagger  /v1/search_tracks:
 *     get:
 *       tags:
 *         - Bandas
 *       summary: 'Returns details about a particular member'
 *       operationId: search_tracks
 *       parameters:
 *         - name: name
 *           in: query
 *           description: Nombre de la band a buscar
 *           required: true
 *           schema:
 *             type: string
 *           explode: false
 *
 *       responses:
 *         '200':
 *           description: 'Sample response: Details about a member by ID'
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Busqueda'
 */

/**
 * @swagger
 *   /v1/favoritos:
 *     post:
 *       tags:
 *         - Bandas
 *       summary: 'Guardar una banda como favorito'
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Favoritos'
 *       responses:
 *         '200':
 *           description: 'OK'
 */
