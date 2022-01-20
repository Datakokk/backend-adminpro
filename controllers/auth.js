const bcrypt = require('bcryptjs');
const { response } = require('express');
const { generateJWT } = require('../helpers/jwt');
const User = require('../models/user');

const login = async (req, res=response ) => {
    
    const { email, password } = req.body;

    try {

        // Check email
        const userDB = await User.findOne({ email });

        if( !userDB ){
            return res.status(404).json({
                ok:false,
                msg: "Password or email isn't valid"
            })
        }

        // Check password
        const validPassword  = bcrypt.compareSync( password, userDB.password );
            if( !validPassword ){
                return res.status(400).json({
                    ok: false,
                    msg: "Password or email isn't valid"
                })
            }

        // Generate web-token - JWT
        const token = await generateJWT( userDB.id);

        res.json({
            //ok: true,
            token 
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Check with administrator',
        })
    }
}

module.exports = {
    login,
}