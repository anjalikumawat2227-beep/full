import {body , validationResult} from "express-validator"
import userModel from "../model/user.model.js";

export const registerValidation=[
    body("name")
        .exists().withMessage("Name is required.").bail()
        .isString().withMessage("Name must be a string.").bail()
        .trim()
        .isLength({min:2,max:50}).withMessage("Name must be contain between 2 to 50 characters.").bail()
        .isAlpha("en-US", {ignore: " "}).withMessage("Name must be alphabetic only"),
    body("email")
        .exists().withMessage("Email is required.").bail()
        .isString().withMessage("Email must be a string.").bail()
        .trim()
        .normalizeEmail()
        .custom(async(value)=>{
             const user = await userModel.findOne({ email: value });
              if (user) {
                 throw new Error('E-mail already in use');
             }
              return true;
             }).bail()
     .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).withMessage("Enter valid Email."),
    body("password")
         .exists().withMessage("Password is required.").bail()
        .trim()
        .isString().withMessage("Password must be a string.").bail()
        .isLength({min:8}).withMessage("Password must be at least 8 characters long"),
        body("confirmPassword")
        .exists().withMessage("Please confirm your password.").bail()
        .trim()
         .isString().withMessage("confirmPassword must be a string.").bail()
        .isLength({min:8}).withMessage("confrimPassword must be at least 8 characters long").bail()
         .custom((value, { req }) => {
           if (value !== req.body.password) {
            throw new Error("Passwords do not match.");
          }
        return true;
    }),
    body("role")
        .exists().withMessage("role is required.")
        .isString().withMessage("Role must be string.").bail()
        .trim()
        .isIn(["user", "seller"]).withMessage("Role can be only seller or user."),
    
        (req,res,next)=>{
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                return res.status(400).json({
                    success:false,
                    message:"Invaild Request",
                    errors: errors.array()
                })
            }
            next()
        }
        
]

export const loginValidation = [
    body("email")
    .exists().withMessage("Email is required.").bail()
        .isString().withMessage("Email must be a string.").bail()
        .trim()
        .normalizeEmail()
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).withMessage("Enter valid Email."),
    body("password")
    .exists().withMessage("Password is required.").bail()
    .isString().withMessage("Password must be a string.").bail()
    .trim()
    .isLength({min:8}).withMessage("Password must be at least 8 characters long"),
    (req,res,next)=>{
        let errors = validationResult(req)
        if(!errors.isEmpty()){
            res.status(400).json({
                success:false,
                message:"Invalid request.",
                errors:errors.array()
            })
        }
        next()
    }
    
]