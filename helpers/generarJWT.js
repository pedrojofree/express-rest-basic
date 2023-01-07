const jwt = require('jsonwebtoken')

const generarJWT = ( uid ) => {

    return new Promise ( ( resolve, reject )  => {

        const payload = { uid };

        // jwt.sign(payload, secretOrPrivateKey, options, callback) 
        jwt.sign(payload, process.env.SECRETKEY, { expiresIn: "4h" }, (err, token) => {
            if (err) {
                console.log( err );
                reject( 'Error when generating JWT' )
            } else {
                resolve ( token )
            }
        });

    })

};

module.exports = { generarJWT };