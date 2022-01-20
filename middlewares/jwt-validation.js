const jsonwebtoken = require("jsonwebtoken");



const validateJWT = (req, res, next ) => {

    // Reading token
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: `There is not token in the request`,
        })
    }
    
    try {

        const { uid } = jsonwebtoken.verify( token, process.env.JWT_SECRET);

        req.uid = uid;
        
        next();
            
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg: `Token isn't valid`
        });
    }

}

module.exports = {
    validateJWT, 
}