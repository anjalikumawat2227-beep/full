import express from "express"
import { loginValidation, registerValidation } from "../validator/auth.validators.js"
import {getMe, login, logoutController, refresh, register} from "../controller/auth.controller.js"
import { authenticat } from "../middelware/authenticat.js"
const router = express.Router()

router.post("/register",registerValidation,register)
router.post("/login",loginValidation,login)
router.post("/refresh-token",refresh)
router.get("/me",authenticat,getMe)
router.get("/logout",logoutController)
export default router