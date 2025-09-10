import express from "express";
import 'dotenv/config';
import { dbConnect } from "./lib/db.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import chatRoutes from "./routes/chat.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
const app=express();
const port=process.env.PORT;
const __dirname = path.resolve();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());
app.use("/auth",authRoutes);
app.use("/user",userRoutes);
app.use("/chat",chatRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
app.get("/",(req,res)=>{
    res.send("hello");
});

app.listen(port,async()=>{
     await dbConnect();
    console.log(`server listening at ${port}`);
})