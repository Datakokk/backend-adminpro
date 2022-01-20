/**
 *  Path: /api/users
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { fieldsValidation } = require('../middlewares/field-validation');

const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users');
const { validateJWT } = require('../middlewares/jwt-validation');

const router = Router();

router.get( '/', validateJWT , getUsers );

router.post( '/', 
[
    check('name', 'The name is mandatory').not().isEmpty(),
    check('password', 'The password is mandatory').not().isEmpty(),
    check('email',  'The email is mandatory').isEmail(),
    fieldsValidation
],

createUser );

router.put( '/:id', 
[   
    validateJWT ,
    check('name', 'The name is mandatory').not().isEmpty(),
    check('email',  'The email is mandatory').isEmail(),
    check('role', 'The role is mandatory').not().isEmpty(),
    fieldsValidation
],
updateUser );


router.delete( '/:id', 
            validateJWT ,
            deleteUser
);

module.exports = router;