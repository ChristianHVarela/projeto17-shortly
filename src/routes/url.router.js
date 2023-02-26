import { Router } from "express";
import { userAccessValidation } from "../middlewares/auth.middleware.js";
import { urlValidator, urlExists } from '../middlewares/url.middleware.js'
import { createShorten, getUrl, useShorten, deleteShorten } from '../controllers/url.controller.js'

export const urlRouter = Router()

urlRouter.post('/urls/shorten', userAccessValidation, urlValidator, createShorten)
urlRouter.get('/urls/:id', getUrl)
urlRouter.get('/urls/open/:shortUrl', urlExists, useShorten)
urlRouter.delete('/urls/:id', userAccessValidation, deleteShorten)