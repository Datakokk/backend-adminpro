/**
 * Path: '/api/searchs/
 */

const { Router } = require('express');
const { getFull, getDocumentCollection } = require('../controllers/search');
const { validateJWT } = require('../middlewares/jwt-validation');


const router = Router();

router.get( '/:search', validateJWT, getFull);
router.get( '/collection/:table/:search', validateJWT, getDocumentCollection);

module.exports = router;

