import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./routes/auth.js"
import prodRoutes from "./routes/productRoute.js"
import compRoutes from "./routes/complaint.js"

const app = express();
dotenv.config()
app.use(express.json())
app.use(cors());

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected To DB");
    
})

app.use("/api/auth", authRoutes)
app.use("/api/product", prodRoutes)
app.use("/api/complaint", compRoutes)
app.listen(3000, ()=>{
    console.log("app running on port 3000");
})