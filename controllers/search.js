/**
 * getFull
 */

const { response } = require('express');
const User = require('../models/user');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');



const getFull = async ( req, res=response ) => {

    const argument = req.params.search;
    const regex = new RegExp(argument, 'i');

    const [ users, doctor, hospital ] = await Promise.all([
        User.find({ name: regex}),
        Doctor.find({ name: regex }),
        Hospital.find({ name: regex }),
    ])

    res.json({
        ok: true,
        users,
        doctor,
        hospital
    })
}

const getDocumentColection = async ( req, res=response ) => {

    const table = req.params.table;
    const search = req.params.search;
    const regex = new RegExp(search, 'i');

    let data = [];

    switch (table) {
        case 'doctors':
            data = await Doctor.find({ nombre: regex })
                                .populate('user', 'name img')
                                .populate('hospital', 'name img')
                                
            break;
                                
        case 'hospitals':
            data = await Hospital.find({ nombre: regex })
                                .populate('user', 'name img')
            break;

        case 'users':
            data = await User.find({ name: regex });

            break;

        default:

            res.status(400).json({
                ok: false,
                msg: 'The table must be users/doctors/hospitals'
            })
    }

    res.json({
        ok: true,
        results: data
    })
}

module.exports = {
    getFull,
    getDocumentColection,
}