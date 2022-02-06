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

const updateDoctors = async( req, res=response ) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const doctorDB = await Doctor.findById( id );

        if( !doctorDB ){
            return res.status(404).json({
                ok: true, 
                msg: 'Doctor not found'
            })
        }

        const changeDoctor = {
            ...req.body,
            user: uid,
        };

        const doctorUpdated = await Doctor.findByIdAndUpdate( id, changeDoctor, { new: true });
        
        res.json({
            ok: true,
            msg: doctorUpdated,
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error checked with administrator'
        })
    }
}

const deleteDoctor = async( req, res=response ) => {
    
    const id = req.params.id;

    try {

        const doctorDB = await Doctor.findById( id );

        if( !doctorDB ){
            return res.status(404).json({
                ok: true, 
                msg: 'Doctor not found',
            })
        }

        await Doctor.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Doctor deleted'
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false, 
            msg: 'Unexpected error checked with administrator'
        })
        
    }
}

module.exports =  {
    getDoctors,
    createDoctors,
    updateDoctors,
    deleteDoctor
}