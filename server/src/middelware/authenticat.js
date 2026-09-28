import { verifyAccessToken } from "../utils/auth.token.js"


export async function authenticat(req,res,next){

const accessToken = req.headers.authorization?.split(" ")[1]
    
   if (!accessToken) {
        return res.status(401).json({
            message: "Access token not found in the request header"
        })
    }
    try{
        const decoded = verifyAccessToken(accessToken)
    
        req.user = decoded

        next()

    }catch(err){
        res.status(401).json({
            message: "Invalid or expired access token"
        })

    }
}