import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { authRouter } from "./routes/auth.router.js"
import { urlRouter } from './routes/url.router.js'

dotenv.config()
const server = express()
server.use(cors())
server.use(express.json())

server.use([authRouter, urlRouter])

server.listen(process.env.PORT || 5000, () => {
    console.log("server is fun");
})