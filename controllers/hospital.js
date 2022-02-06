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
 
 const updateHospitals = async( req, res=response ) => {

    const id  = req.params.id;
    const uid = req.uid; 

     try {

        const hospitalDB = await Hospital.findById( id );

        if ( !hospitalDB ){
            return res.status(404).json({
                ok: true,
                msg: 'Hospital not found'
            })
        }

        const changeHospital = {
            ...req.body,
            user: uid
        }

        const hospitalUpdated = await Hospital.findByIdAndUpdate( id, changeHospital, { new: true });
        
        res.json({
            ok:true,
            hospital: hospitalUpdated
        })
         
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: true, 
            msg: 'Unexpected error checked with administrator'
        })
    }
 }

 const deleteHospital = async( req, res=response ) => {

    const id = req.params.id;
    
    try {
        
        const hospitalDB = await Hospital.findById( id );

        if ( !hospitalDB ){
            return res.status(404).json({
                ok: true,
                msg: 'Hospital not found',
            })
        }

        await Hospital.findByIdAndDelete( id );

        res.json({
            ok:true,
            msg: 'deleteHospital'
        })

    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: 'Unexpectd error checked with administrator'
        })
    }
 };

   
 module.exports = {
    getHospitals,
    createHospitals,
    updateHospitals,
    deleteHospital
 }