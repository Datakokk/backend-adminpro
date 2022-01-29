/**
 * Route: /api/uploads/
 */

const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

const { fileUpload, recoverImage } = require('../controllers/uploads');
const { validateJWT } = require('../middlewares/jwt-validation');

const router = Router();

router.use( expressFileUpload() );

router.put('/:type/:id', validateJWT, fileUpload );

router.get('/:type/:photo',  recoverImage );

module.exports = router;