/**
 * Hospitals
 * Path: '/api/hospitals' 
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { getHospitals, createHospitals, updateHospitals, deleteHospital } = require('../controllers/hospital');



const router = Router();

router.get( '/', getHospitals);

router.post( '/', 
    [],
    createHospitals
);

router.put( '/:id', 
    [],
    updateHospitals
);

router.delete( '/:id',
    deleteHospital
)

module.exports = router;
