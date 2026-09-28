import cookieParser from "cookie-parser"
import express from "express"
import authRouter from "../routers/auth.route.js"
import productsRouter from "../routers/product.route.js"
import cors from "cors";
const app = express()

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://client-black-three-24.vercel.app"
    ],
    credentials: true
}));

app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res) => {
    res.json({
        message: "Backend is running"
    });
});

app.use("/api/auth",authRouter)
app.use("/api/products",productsRouter)
export default app

