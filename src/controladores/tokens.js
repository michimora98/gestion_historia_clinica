const jwt = require ('jsonwebtoken');

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

const verifyToken = async(token) => {
    try{

        return jwt.verify(token,JWT_SECRET = '123456')

    }catch (e){
        return null
    }
}

module.exports = {tokenSign,verifyToken};