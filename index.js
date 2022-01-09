require('dotenv').config();

const express = require('express');
const cors = require('cors')

const { dbConnection } = require('./database/config')

// Create express sever
const app = express();

//Setting cors
app.use(cors());

//Database
dbConnection();

// Routes
app.get( '/', (req, res) => {

    res.json({
        ok: true,
        msg: "Hello world"
    })
});


app.listen( process.env.PORT, () => {
    console.log(`Server running in the port ${process.env.PORT}!!`);
})

