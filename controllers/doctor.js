const { response } = require('express');
const Doctor = require('../models/doctor');

const getDoctors = async ( req, res=response ) => {

    const doctors = await Doctor.find()
                                .populate('user', 'name')
                                .populate('hospital', 'name')
    res.json({
        ok: true,
        doctors
    });
}

const createDoctors = async ( req, res=response ) => {

    const uid = req.uid;
    const doctor = new Doctor({
        user: uid,
        ...req.body
    });

    try {
        
        const DoctorDb = await doctor.save();
        
        res.json({
            ok: true,
            Doctor: DoctorDb,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error checked with administrator'
        })
    }
}

const updateDoctors = ( req, res=response ) => {
    res.json({
        ok: true,
        msg: 'updateDoctors',
    });
}

const deleteDoctor = ( req, res=response ) => {
    res.json({
        ok: true,
        msg: 'deleteDoctor'
    })
}

module.exports =  {
    getDoctors,
    createDoctors,
    updateDoctors,
    deleteDoctor
}