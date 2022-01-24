const jwt = require('jsonwebtoken');



const generateJWT = async (uid) => {
    

    return new Promise((resolve, reject) => {
        
        const payload = {
            uid
        }

        jwt.sign(payload, process.env.JWT_SECRET_SEED, {
            expiresIn: '100h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Error en generar JWT');
            } else {
                resolve(token);
            }

        })

    });

};

module.exports = { generateJWT }