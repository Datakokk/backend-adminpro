const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require('../helpers/update-image');
const req = require('express/lib/request');


const fileUpload = ( req, res=response ) => {

    const type = req.params.type;
    const id = req.params.id;
    
    // Validate type
    const validTypes = ['hospitals', 'doctors', 'users' ];
    if( !validTypes.includes(type)){
        return res.status(400).json({
            ok: false, 
            msg: `Its'n a doctor, user or hospital(${type})`
        })
    }

    // Verify that a file exists
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No files were uploaded.' 
        })
    }

    // Process the image
    const file = req.files.image;

    const cutName = file.name.split('.'); 

    const fileExtension = cutName[cutName.length - 1];

    // Validate extension
    const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];
    if( !validExtensions.includes( fileExtension) ){
        return res.status(400).json({
            ok: false,
            msg: 'Extension not allowed'
        })
    }


    // Generate file name
    const fileName = `${ uuidv4() }.${ fileExtension }`;

    // Path to save the image
    const path = `./uploads/${ type }/${ fileName }`;

    // Use the mv() method to place the file somewhere on your server
    file.mv(path, ( err ) => {
        if (err){
            console.log( err );
            return res.status(500).json({
                ok: false, 
                msg: 'Error moving the image'
            })
        }
    
    //Update database 
    updateImage( type, id, fileName );


     
        res.json({
            ok: true, 
            msg: 'File uploaded',
            fileName
        })
        
    });


}

const recoverImage = ( req, res=response ) => {
 
    const type = req.params.type;
    const photo = req.params.photo;

    const pathImg = path.join( __dirname, `../uploads/${type}/${photo}`);

    // Default image
    if( fs.existsSync( pathImg )){
        res.sendFile( pathImg )
    }else{
        const pathImg = path.join( __dirname, `../uploads/no-img.jpg`);
        res.sendFile( pathImg );
    }

}

module.exports = {
    fileUpload,
    recoverImage
}