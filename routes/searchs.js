/**
 * Path: '/api/searchs/
 */

const { Router } = require('express');
const { getFull, getDocumentColection } = require('../controllers/search');
const { validateJWT } = require('../middlewares/jwt-validation');


const router = Router();

router.get( '/:search', validateJWT, getFull);
router.get( '/colection/:table/:search', validateJWT, getDocumentColection);

module.exports = router;

