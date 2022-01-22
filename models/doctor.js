const  { Schema, model } = require('mongoose');

const DoctorSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    img: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    }
});

module.exports = model( 'Doctor', DoctorSchema );