import { Router } from "express"
import { signInController, signUpController } from "../controllers/auth.controller.js"
import { signinValidator, signupValidator } from "../middlewares/auth.middleware.js"

export const authRouter = Router()

authRouter.post('/signup', signupValidator, signUpController)
authRouter.post('/signin', signinValidator, signInController)