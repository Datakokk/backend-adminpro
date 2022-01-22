 const { response } = require('express');

 const getHospitals = ( req, res=response ) => {
     res.json({
         ok:true,
         msg: 'getHospital'
     })
 }

 const createHospitals = ( req, res=response ) => {
     res.json({
         ok:true,
         msg: 'createHospitals'
     });
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