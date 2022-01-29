require('dotenv').config();

const express = require('express');
const cors = require('cors')

const { dbConnection } = require('./database/config');

// Create express sever
const app = express();

//Setting cors
app.use(cors());

// Reading and parsing the body
app.use( express.json() );

//Database
dbConnection();

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/hospitals', require('./routes/hospitals'));
app.use('/api/doctors', require('./routes/doctors'));
app.use('/api/searchs', require('./routes/searchs'));
app.use('/api/upload', require('./routes/uploads'));
app.use('/api/login', require('./routes/auth'));



app.listen( process.env.PORT, () => {
    console.log(`Server running in the port ${process.env.PORT}!!`);
})

