import jwt from "jsonwebtoken"
import config from "../config/env.config.js"
import crypto from "crypto"
export function createAccessToken(payload){
    const accessToken = jwt.sign(payload , config.ACCESS_TOKEN_SECRET,{expiresIn:"15m"})
    return accessToken
}

export function verifyAccessToken(accessToken){
 return jwt.verify(accessToken,config.ACCESS_TOKEN_SECRET)
}

export function createRefreshToken(payload){
    const refreshToken = jwt.sign(payload , config.REFRESH_TOKEN_SECRET,{expiresIn:"7d"})
    return refreshToken
}
export function verifyRefreshToken(refreshToken){
    return jwt.verify(refreshToken,config.REFRESH_TOKEN_SECRET)
}
export function hashRefreshToken(token){
return crypto.createHash("sha256").update(token).digest("hex")
}
