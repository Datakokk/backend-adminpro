/**
 * Doctors
 * 
 *  Path: '/api/doctors'
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { getDoctors, createDoctors, updateDoctors, deleteDoctor } = require('../controllers/doctor');

const router = Router();

router.get( '/', getDoctors);

router.post( '/',
    [],
    createDoctors
);

router.put('/:id',
    [],
    updateDoctors
);

router.delete( '/:id',
    [],
    deleteDoctor
);

module.exports = router;