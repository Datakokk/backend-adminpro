/**
 * Doctors
 * 
 *  Path: '/api/doctors'
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { getDoctors, createDoctors, updateDoctors, deleteDoctor } = require('../controllers/doctor');
const { fieldsValidation } = require('../middlewares/field-validation');
const { validateJWT } = require('../middlewares/jwt-validation');

const router = Router();

router.get( '/', getDoctors);

router.post( '/',
    [
        validateJWT,
        check('name', 'The Doctor name is mandatory').not().isEmpty(),
        check('hospital', 'The hospital id must be valid').isMongoId(),
        fieldsValidation
    ],
    createDoctors
);

router.put('/:id',
    [
        validateJWT,
        check('name', 'The Doctor name is mandatory').not().isEmpty(),
        check( 'hospital', 'The hospital id must be valid').isMongoId(),
        fieldsValidation
    ],
    updateDoctors
);

router.delete( '/:id',
    [],
    deleteDoctor
);

module.exports = router;