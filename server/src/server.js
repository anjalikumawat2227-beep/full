import app from "./app/app.js"
import { connectDB } from "./config/db.config.js"
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 3000;

await connectDB()
app.listen(PORT,()=>{
console.log("server is running on port 3000")
})
