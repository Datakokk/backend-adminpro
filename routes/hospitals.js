/**
 * Hospitals
 * Path: '/api/hospitals' 
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { getHospitals, createHospitals, updateHospitals, deleteHospital } = require('../controllers/hospital');
const { fieldsValidation } = require('../middlewares/field-validation');
const { validateJWT } = require('../middlewares/jwt-validation');



const router = Router();

router.get( '/', getHospitals);

router.post( '/', 
    [
        validateJWT,
        check('name', 'The hospital name is mandatory').not().isEmpty(), 
        fieldsValidation
    ],
    createHospitals
);

router.put( '/:id', 
    [
        validateJWT,
        check('name', 'The hospital name is mandatory').not().isEmpty(), 
        fieldsValidation
    ],
    updateHospitals
);

router.delete( '/:id',
    validateJWT,
    deleteHospital
)

module.exports = router;
