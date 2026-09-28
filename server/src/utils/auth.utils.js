import jwt from 'jsonwebtoken'
import config from '../config/dotenv.js'

export const createAccessToken = (userId)=>{
    const token = jwt.sign({
        id : userId
    },config.access , {
        expiresIn : '15m'
    })

    return token
}

export const createRefreshToken = (userId)=>{
   const token = jwt.sign({
        id : userId
    } , config.refresh , {
        expiresIn : '7d'
    })

    return token 
}

export const  verifyRefreshToken = (token)=>{
   const decode = jwt.verify(token , config.refresh)
   return decode
}

export const verifyAccessToken = (token)=>{
    const decode = jwt.verify(token , config.access)
    return decode
}