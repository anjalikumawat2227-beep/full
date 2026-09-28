import userModel from "../model/user.model.js"
import bcrypt from "bcryptjs"
import cookie from "cookie-parser"
import { createAccessToken, createRefreshToken, hashRefreshToken, verifyRefreshToken } from "../utils/auth.token.js"

const isProduction = process.env.NODE_ENV === "production";

const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/"
};

export async function register(req,res){
const {name,email,password,confirmPassword,role}= req.body

const isUserAlreadyExists = await userModel.findOne({email})
if(isUserAlreadyExists){
    return res.status(409).json({
        success:false,
        message: "invalid credentials.",
        errors:[
            {
                path:"email",
                msg:"Email is already exists"
            }
        ]
    })
}

if(password !== confirmPassword){
    return rea.status(400).json({
        success:false,
        message: "invalid credentials.",
        errors:[
            {
                path:"confirmPassword",
                msg:"confirmPassword is not match with password"
            }
        ]
    })
}

const user = await userModel.create({
    name,email,role,
    passwordHash:await bcrypt.hash(password,10)
})

const accessToken = createAccessToken({id:user._id ,role:user.role})
const refreshToken =  createRefreshToken({id:user._id ,role:user.role})

const refreshTokenHash = hashRefreshToken(refreshToken)

await userModel.findByIdAndUpdate(user._id,
  {
    refreshToken:refreshTokenHash
  })

res.cookie("refreshtoken",refreshToken,cookieOptions)

res.status(201).json({
    success:true,
    message:"user registerd successfully",
    data:{
        user:{
            id:user._id,
            name:user.name,
            email:user.email,
            role:user.role
        },
      accessToken
    }
})
}

export  async function login(req, res){
  const { email, password } = req.body;

  let user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid email and password.",
    });
  }

  let isPasswordVaild = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordVaild) {
    return res.status(400).json({
      success: false,
      message: "Invalid email and password.",
    });
  }

  let accessToken = createAccessToken({
    id: user._id,
    role: user.role,
  });
  let refreshToken = createRefreshToken({
    id: user._id,
    role: user.role,
  });

  const refreshTokenHash = hashRefreshToken(refreshToken)

  await userModel.findOneAndUpdate({ email }, { refreshToken:refreshTokenHash});
  
  res.cookie("refreshtoken", refreshToken, cookieOptions);

  res.status(200).json({
    success: true,
    message: "user login successfully",
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role:user.role
      },
      accessToken,
    },
  });
};

export async function refresh(req,res){

    const refreshToken = req.cookies.refreshtoken;

    if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: "Refresh token is required.",
    });
  }

  try{
    const decoded = verifyRefreshToken(refreshToken)
    const user = await userModel.findById(decoded.id)

    const refreshTokenHash = hashRefreshToken(refreshToken)

    if(refreshTokenHash != user.refreshToken){
        await userModel.findByIdAndUpdate(user._id,{refreshToken:null})
        return res.status(401).json({
        success: false,
        message: "Invalid refresh Token.",
      });
    }

    const accessToken = createAccessToken({id:user._id,role:user.role})
    const newRefreshToken = createRefreshToken({id:user._id,role:user.role})
    const newRefreshTokenHash= hashRefreshToken(newRefreshToken)

    await userModel.findByIdAndUpdate(user._id,{refreshToken:newRefreshTokenHash})

    res.cookie("refreshtoken",newRefreshToken,cookieOptions)

    res.status(200).json({
        success:true,
        message:"accessToken generate successfully",
        data:{
            accessToken
        }
    })

  }catch(err){
     return res.status(401).json({
            message: "Invalid refresh Token"
        })
  }

}

export async function getMe(req,res){
    const {id,role}=req.user

    const user = await userModel.findById(id)
   
    res.status(200).json({
        message: "User data fetch successfully",
        data: {
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role:user.role
            }
        }
    })
}

//logout api 
export async function logoutController(req,res){
  const refreshToken = req.cookies.refreshtoken;

  if (!refreshToken) {
    return res.status(400).json({
      massage: "Refresh token not found",
    });
  }

  try{
    let decoded = verifyRefreshToken(refreshToken)
     let user = await userModel.findById(decoded.id)

await userModel.findByIdAndUpdate(user._id,{refreshToken:null})
res.clearCookie("refreshtoken",cookieOptions)

return res.status(200).json({
  sucess:true,
  message:"logout successfully"
})

  }catch(error){
      return res.status(401).json({
            message: "Invalid refresh Token"
        })
  
  }
}