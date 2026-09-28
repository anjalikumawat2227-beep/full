import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength: [ 2, "Name must be at least 2 characters long" ],
        maxLength: [ 50, "Name must be at most 20 characters long" ],
        match: /^\S.{1,50}$/
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    passwordHash:{
        type:String,
        required:true,
        minLength: [ 8, "Password must be at least 8 characters long" ],
       
    },
   role: {
        type: String,
        default: "user",
        enum: [ "user", "seller" ]
    },
    refreshToken:{
        type:String
    }
})

const userModel = mongoose.model("user",userSchema)
export default userModel