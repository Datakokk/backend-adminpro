 const { response } = require('express');
 const Hospital = require('../models/hospital');

 const getHospitals = async ( req, res=response ) => {

    const hospitals = await Hospital.find()
                                    .populate('user', 'name')
     
    res.json({
         ok:true,
         hospitals
     })
 }

 const createHospitals = async ( req, res=response ) => {
    
     const uid = req.uid;
    const hospital = new Hospital({
        user: uid,
        ...req.body
    });


    try {

        const hospitalDb = await hospital.save();
        
        res.json({
             ok:true,
             hospital: hospitalDb,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error checked with administrator'
        })
    }
    
 };
 
 const updateHospitals = ( req, res=response ) => {
     res.json({
         ok:true,
         msg: 'updateHospitals'
     })
 }

 const deleteHospital = ( req, res=response ) => {
     res.json({
         ok:true,
         msg: 'deleteHospital'
     })
 }

   
 module.exports = {
    getHospitals,
    createHospitals,
    updateHospitals,
    deleteHospital
 }