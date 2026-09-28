import authModel from "../model/auth.model.js"
import { verifyAccessToken } from "../utils/auth.utils.js"

export const authentication = async(req , res , next)=>{
     const token = req.headers.authorization

    if(!token){
       return res.status(401).json({
            message : 'access token is Required'
        })
    }

    try {
        const decode = verifyAccessToken(token)

        const user = await authModel.findById(decode.id)

        if(!user){
           return res.status(404).json({
                message : 'user not found'
            })
        }

        req.user = user 
        next()

    } catch (error) {
       return res.status(401).json({
            message  :'invalid or expire access token'
        })
    }
}