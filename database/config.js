const mongoose = require('mongoose');
require('dotenv').config();


const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.DB_CNN);

        console.log('DB Online forsetter å stige!!!');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error when starting DB see logs');
    }
}

module.exports = {
    dbConnection,
}