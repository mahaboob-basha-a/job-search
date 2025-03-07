import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 4041

app.use(express.json());
app.use(cors({origin:process.env.CLEINT_URL, credentials:true}));
app.use(cookieParser());

// Api Routes
app.use("/user",userRoutes);
app.use("/job",jobRoutes); 

// default route
app.use((req,res)=>{
    res.json({message:"server running..."})
})

app.listen(PORT,()=>console.log("server running... at",PORT)); 