const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({
     
    name: {
         type: String,
         required: true
     },
     img: {
         type: String,
     }, 
     user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'  
     }
})


module.exports = model( 'Hospital', HospitalSchema );



