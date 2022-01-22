const { response } = require('express');

const getDoctors = ( req, res=response ) => {
    res.json({
        ok: true,
        msg: 'getDoctors',
    });
}

const createDoctors = ( req, res=response ) => {
    res.json({
        ok: true,
        msg: 'createDoctors'
    });
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