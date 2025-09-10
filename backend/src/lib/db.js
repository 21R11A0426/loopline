import mongoose from "mongoose";
import "dotenv/config";

export const dbConnect=async()=>{
   await mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected!')).catch((error)=>{
    console.log(`some error occured:${error}`)
  });
}