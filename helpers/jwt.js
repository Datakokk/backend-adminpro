const jwt = require('jsonwebtoken');


const generateJWT = ( uid ) => {
    
    return new Promise( ( resolve, reject ) => {

        const payload = {
            uid,
        };

        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (err, token ) => {
    
          if( err ){
                console.log(err);
                reject("Can't generate the JWT");
          } else{
              resolve( token );
          }
        });
    });

}

module.exports = {
    generateJWT,
}


// var serveIndex = require('serve-index');
// app.use(express.static(__dirname + '/'))
// app.use('/uploads', serveIndex(__dirname + '/uploads'));
