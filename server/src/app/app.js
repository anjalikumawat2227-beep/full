import cookieParser from "cookie-parser"
import express from "express"
import authRouter from "../routers/auth.route.js"
import productsRouter from "../routers/product.route.js"
const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRouter)
app.use("/api/products",productsRouter)
export default app

