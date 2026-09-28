import { Router } from "express";
import { getMe, login, logout, refresh, register } from "../controller/auth.conroller.js";
import { loginValidator, registerValidation } from "../validation/auth.valid.js";
import { authentication } from "../middleware/auth.middle.js";

const authRouter = Router()

authRouter.post('/register' , registerValidation , register)
authRouter.post('/login' , loginValidator , login)
authRouter.post('/refresh' , refresh)
authRouter.get('/me' , authentication , getMe)
authRouter.post('/logout' , authentication , logout)
export default authRouter