const jwt = require ('jsonwebtoken');

//Token de auutenticación con identificadores _id y role.
const tokenSign = async(id,rol) => {
    return jwt.sign(
        {
            _id: id,
            role: rol
        }, 
        JWT_SECRET = '123456',
        {
            expiresIn : "2h",
        }
    )
}

//Token que verifica otro token para verificar que si corresponde al entorno actual, gracias la clave secreta 123456.
const verifyToken = async(token) => {
    try{

        return jwt.verify(token,JWT_SECRET = '123456')

    }catch (e){
        return null
    }
}

module.exports = {tokenSign,verifyToken};