import express from 'express'
import authRouter from '../router/auth.routes.js'
import cookieParser from 'cookie-parser'
import productRouter from '../router/products.route.js'
import cors from "cors";

const app = express()
app.use(cors({
  origin: "https://curd-frontend-ten.vercel.app",
  credentials: true
}));

app.use(express.json())
app.use(cookieParser())
app.use('/api/auth' , authRouter)
app.use('/api/product' , productRouter)

export default app