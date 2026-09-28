import dotenv from "dotenv" 
dotenv.config()

if(!process.env.MONGO_URI){
     throw new Error ("MONGO_URI is not defiend in environment variables.")
}
if(!process.env.ACCESS_TOKEN_SECRET){
     throw new Error ("ACCESS_TOKEN_SECRET is not defiend in environment variables.")
}
if(!process.env.REFRESH_TOKEN_SECRET ){
     throw new Error ("REFRESH_TOKEN_SECRET  is not defiend in environment variables.")
}
if(!process.env.IMAGEKIT_PRIVATE_KEY){
     throw new Error ("IMAGEKIT_PRIVATE_KEY is not defiend in environment variables.")
}

const config = {
    MONGO_URI : process.env.MONGO_URI,
    ACCESS_TOKEN_SECRET:process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET :process.env.REFRESH_TOKEN_SECRET,
    IMAGEKIT_PRIVATE_KEY:process.env.IMAGEKIT_PRIVATE_KEY
}
export default config