/**
 *  Path: /api/login
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn, renewToken } = require('../controllers/auth');
const { fieldsValidation } = require('../middlewares/field-validation');
const { validateJWT } = require('../middlewares/jwt-validation');

const router = Router();

router.post('/', 
[
    check('email', 'The email is mandatory').isEmail(),
    check('password', 'The password is mandatory').not().isEmpty(),
    fieldsValidation 
],
login
)

router.post('/google', 
[
    check('token', 'Google token is mandatory').not().isEmpty() ,
    fieldsValidation 
],
googleSignIn
)

router.get('/renew', 
    validateJWT,
    renewToken
)

module.exports = router;