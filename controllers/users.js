const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const getUsers = async (req, res) => {

    //const users = await User.find({}, 'name email role google');
    const users = await User.find({}, { __v:0});

    res.json({
        ok: true, 
        users,
        uid: req.uid,
    })
}

const createUser = async (req, res=response ) => {

    const { email, password, name } = req.body;

    try {

        const existEmail = await User.findOne({ email });
        if( existEmail ){
            return res.status(400).json({
                ok: false,
                msg: 'The user already exist'
            })
        }

        const user = new User( req.body );
        
        // encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        //Save user
        await user.save();

        // Generate web-token - JWT
        const token = await generateJWT( user.id);
    
        res.json({
            ok: true, 
            user,
            token
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error checked logs'
        })
    };

}

const updateUser = async (req, res=response, next) => {

    //TODO: Validate token and check if it is the correct user  
    
        const uid = req.params.id;
        
        try {
            
            const userDB = await User.findById(uid);
            
            if( !userDB ){
                return res.status(404).json({
                    ok: false,
                    msg: "the user doesn't exist"
                });
            }
            
            //Update
            const {password, google, email, ...fields} = req.body;
            
            if( userDB.email !== email ){
                
                const existEmail = await User.findOne({ email });
                if( existEmail ){
                    return res.status(400).json({
                        ok:false,
                        msg: 'Already exist this user'
                    });
                }
            }
            
            fields.email = email;
            
            const userUpdated = await User.findByIdAndUpdate(uid, fields, { new:true });
            
            res.json({
                ok: true, 
                user: userUpdated
            })
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false, 
                msg: "Unexpected error"
            })
        }
    }
    
    const deleteUser  = async (req, res) => {
        
        const uid = req.params.id;

        try {

            const userDB = await User.findById(uid);

            if( !userDB ){
                return res.status(404).json({
                    ok: false,
                    msg: "the user doesn't exist"
                });
            }

            // Delete the document by its _id
            await User.deleteOne({ _id: uid});

            res.status(200).json({
                ok: true,
                msg: `The user with id: ${uid} deleted`,
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
    getUsers,
    createUser, 
    updateUser, 
    deleteUser
}