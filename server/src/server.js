import app from "./app/app.js"
import { connectDB } from "./config/db.config.js"
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

await connectDB()
app.listen(3000,()=>{
console.log("server is running on port 3000")
})
