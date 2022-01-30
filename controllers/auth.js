const bcrypt = require('bcryptjs');
const { response } = require('express');
const { googleVerify } = require('../helpers/google-verify');
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

const googleSignIn = async( req, res=response ) => {

    const googleToken = req.body.token;

    try {

        const { name, email, picture } = await googleVerify( googleToken );

        const userDB = await User.findOne({ email });

        let user;

        if ( !userDB ){

            user = new User({
                name,
                email, 
                password: '@@@',
                img: picture, 
                google: true
            });
        }else{

            user = userDB;
            user.google = true;
        }

        // Save to database
        await user.save();

        // Generate web-token - JWT
        const token = await generateJWT( userDB.id);
        
        res.json({
            ok: true,
            msg: 'Google Signin',
            token
        });
        
    } catch (error) {
        
        res.status(400).json({
            ok: false,
            msg: 'Token is not valid',
        });
        
    }
}

module.exports = {
    login,
    googleSignIn
}