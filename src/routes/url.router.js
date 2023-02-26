import { Router } from "express";
import { userAccessValidation } from "../middlewares/auth.middleware.js";
import { urlValidator } from '../middlewares/url.middleware.js'
import { createShorten } from '../controllers/url.controller.js'

export const urlRouter = Router()
urlRouter.use(userAccessValidation)

urlRouter.post('/urls/shorten', urlValidator, createShorten)