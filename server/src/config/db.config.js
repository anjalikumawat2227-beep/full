import mongoose from "mongoose"
import config from "./env.config.js"

export async function connectDB (){
    try{
        await mongoose.connect(config.MONGO_URI)
        console.log("Database is connected.")
    }catch(err){
        console.log(`DataBase connection error : ${err}`)
    }
}